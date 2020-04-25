import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Welcome.css';
import socketIOClient from "socket.io-client";

class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.clickCreateNewSession = this.clickCreateNewSession.bind(this);
        this.clickJoinWhiteboardSession = this.clickJoinWhiteboardSession.bind(this);
    }

    clickCreateNewSession(){

    }

    clickJoinWhiteboardSession(){

    }

    componentDidMount() {
        document.getElementById("btnCreateNewSession").addEventListener('click', this.clickCreateNewSession, false);
        document.getElementById("btnCreateNewSession").addEventListener('click', this.clickCreateNewSession, false);
    }

    render() {

        return (
            <React.Fragment>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="javascript:void(0);"><img src="./../logo26.png" /> Whiteboards.live</a>
                </nav>
                <h3>
                    Welcome!
                </h3>
                <p>
                    Whiteboards.live is an open source application allowing users to simulate the white boarding
                    experience online.
                </p>
                <h5>Create a new whiteboard:</h5>
                <p>
                    <button id="btnCreateNewSession">Create New Whiteboard Session</button>
                </p>
                <h5>Join an existing session:</h5>
                <p>
                    <input type="text" id="sessionKeyInput" /><br />
                    <button id="btnJoinSession">Join Whiteboard Session</button>
                </p>

            </React.Fragment>
        );

    }

}

export default Welcome;
