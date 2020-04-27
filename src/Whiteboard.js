import React from 'react';
import socketIOClient from "socket.io-client";

class Whiteboard  extends React.Component {
    constructor(props) {
        super(props);

        let key = this.getSessionKey();

        this.state = {
            key: key,
            drawing: false
        };

        this.drawLine = this.drawLine.bind(this);
        this.fetchWhiteboardState = this.fetchWhiteboardState.bind(this);
        this.getSessionKey = this.getSessionKey.bind(this);
        this.onClickExport = this.onClickExport.bind(this);
        this.onDrawingEvent = this.onDrawingEvent.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onParticipantUpdate = this.onParticipantUpdate.bind(this);
        this.onResize = this.onResize.bind(this);
        this.throttleMoveEvent = this.throttleMoveEvent.bind(this);
        this.throttleResizeEvent = this.throttleResizeEvent.bind(this);

    }

    componentDidMount() {
        const DRAW_EVENT_THROTTLE_MS = 10;
        const RESIZE_EVENT_THROTTLE_MS = 500;

        let canvas = document.getElementById('whiteboard');
        let socket = socketIOClient(process.env.REACT_APP_SOCKET_BASE_URI+"/"+this.state.key);
        let context = canvas.getContext('2d');

        this.setState({
            socket: socket,
            canvas: canvas,
            context: context
        }, ()=>{});

        document.getElementById("aExport").addEventListener('click', this.onClickExport, false);

        canvas.addEventListener('mousedown', this.onMouseDown, false);
        canvas.addEventListener('mouseup', this.onMouseUp, false);
        canvas.addEventListener('mouseout', this.onMouseUp, false);
        canvas.addEventListener('mousemove', this.throttleMoveEvent(this.onMouseMove, DRAW_EVENT_THROTTLE_MS), false);

        canvas.addEventListener('touchstart', this.onMouseDown, false);
        canvas.addEventListener('touchend', this.onMouseUp, false);
        canvas.addEventListener('touchcancel', this.onMouseUp, false);
        canvas.addEventListener('touchmove', this.throttleMoveEvent(this.onMouseMove, DRAW_EVENT_THROTTLE_MS), false);

        socket.on('drawing', this.onDrawingEvent);
        socket.on('participantUpdate', this.onParticipantUpdate);

        window.addEventListener('resize', this.throttleResizeEvent(this.onResize, RESIZE_EVENT_THROTTLE_MS), false);
        this.onResize();
    }

    fetchWhiteboardState(){
        fetch(process.env.REACT_APP_API_BASE_URI+"/api/whiteboard/"+this.state.key+"/cache")
            .then(res => res.json())
            .then(
                (result) => {
                    for(let i=0; i < result.length; i++){
                        this.onDrawingEvent(result[i]);
                    }
                },
                (error) => {
                    console.error(error);
                }
            )

    }

    drawLine(x0, y0, x1, y1, color, lineWidth, emit, author){

        let top = this.state.currentTop;
        let left = this.state.currentLeft;
        y0 -= top;
        y1 -= top;
        x0 -= left;
        x1 -= left;
        //console.log("drawLine", x0, y0, x1, y1, color, lineWidth, emit, author, top, left);

        this.state.context.beginPath();
        this.state.context.moveTo(x0, y0);
        this.state.context.lineTo(x1, y1);
        this.state.context.strokeStyle = color;
        this.state.context.lineWidth = lineWidth;
        this.state.context.stroke();
        this.state.context.closePath();

        if (!emit) { return; }

        let w = this.state.canvas.width;
        let h = this.state.canvas.height;

        this.state.socket.emit('drawing', {
            x0: (x0 / w).toPrecision(4),
            y0: (y0 / h).toPrecision(4),
            x1: (x1 / w).toPrecision(4),
            y1: (y1 / h).toPrecision(4),
            color: color,
            size: lineWidth
        });
    }

    getSessionKey(){
        const currentUrl = window.location.pathname;
        let uuidRegEx = new RegExp(/\/whiteboard\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
        let matchArray = currentUrl.match(uuidRegEx);
        if(matchArray !== null && matchArray.length === 2){
            return matchArray[1];
        }
    }

    onMouseDown(e){
        this.setState({
            drawing: true,
            currentX: e.clientX||e.touches[0].clientX,
            currentY: e.clientY||e.touches[0].clientY
        }, ()=>{});
    }

    onMouseUp(e){
        if (!this.state.drawing) { return; }

        let x0 = this.state.currentX;
        let y0 = this.state.currentY;
        let x1 = e.clientX||e.touches[0].clientX;
        let y1 = e.clientY||e.touches[0].clientY;

        this.setState({drawing: false}, () => {
            let author = "local";
            let emit = true;
            let color = this.props.getColor();
            let size = this.props.getSize();
            this.drawLine(x0, y0, x1, y1, color, size, emit, author);
        });
    }

    onMouseMove(e){
        if (!this.state.drawing) { return; }

        let x0 = this.state.currentX;
        let y0 = this.state.currentY;
        let x1 = e.clientX||e.touches[0].clientX;
        let y1 = e.clientY||e.touches[0].clientY;

        this.setState({
            currentX: x1,
            currentY: y1
        }, (args) => {
            let author = "local";
            let emit = true;
            let color = this.props.getColor();
            let size = this.props.getSize();

            this.drawLine(x0, y0, x1, y1, color, size, emit, author);
        });
    }

    onParticipantUpdate(data){
        document.getElementById("participantCount").innerText = data.count;
    }

    // limit the number of events per second
    throttleMoveEvent(callback, delay) {
        let previousCall = new Date().getTime();
        return function() {
            let time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }

    // limit the number of events per second
    throttleResizeEvent(callback, delay) {
        let timeoutHandle = false;
        return function() {
            if(timeoutHandle) {
                clearTimeout(timeoutHandle);
            }
            timeoutHandle = setTimeout(() => {
                callback();
                timeoutHandle = false;
            },delay);
        };
    }

    onDrawingEvent(data){
        let w = this.state.canvas.width;
        let h = this.state.canvas.height;
        let top = this.state.currentTop;
        let left = this.state.currentLeft;
        let emit = false;
        let author = "remote";
        let x0 = Math.ceil(data.x0 * w)+left;
        let y0 = Math.ceil(data.y0 * h)+top;
        let x1 = Math.ceil(data.x1 * w)+left;
        let y1 = Math.ceil(data.y1 * h)+top;

        this.drawLine(x0, y0, x1, y1, data.color, data.size, emit, author);
    }

    onResize() {
        let root = document.getElementById("root");
        let canvas = document.getElementById('whiteboard');

        let rect = canvas.getBoundingClientRect();
        let offsetTop = Math.floor(rect.top);
        let offsetLeft = Math.floor(rect.left);

        this.setState({
            currentTop: offsetTop,
            currentLeft: offsetLeft
        }, ()=> {});

        canvas.width = root.clientWidth-offsetLeft;
        canvas.height = root.clientHeight-offsetTop;

        this.fetchWhiteboardState();
    }

    onClickExport() {
        const downloadFileName = "whiteboard-image.png";
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(this.state.canvas.msToBlob(), downloadFileName)
        }else{
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = this.state.canvas.toDataURL();
            a.download = downloadFileName;
            a.click();
            document.body.removeChild(a);
        }
    }

    render() {
        return (
            <canvas
                id="whiteboard"
                className="whiteboard"
            ></canvas>
        );
    }

}

export default Whiteboard;
