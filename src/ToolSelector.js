import React from "react";
import './ToolSelector.css';

class ToolSelector  extends React.Component {
    constructor(props) {
        super(props);
        this.onToolUpdate = this.onToolUpdate.bind(this);
        this.state = {};
    }

    componentDidMount() {

        let tools = document.getElementsByClassName('tool');

        this.setState({tools:tools});

        for (let i = 0; i < tools.length; i++){
            tools[i].addEventListener('click', this.onToolUpdate, false);
        }

    }

    onToolUpdate(e){

        for(let i = 0; i < this.state.tools.length; i++){
            let tool = this.state.tools[i];

            tool.className = "tool " + tool.getAttribute("tool_class");
        }

        e.target.className = "tool toolSelected " + e.target.getAttribute("tool_class");

        this.props.onChangeTool(e.target.getAttribute("tool_class"));
    }

    render() {
        return (
            <div className="tools">
                <div title="Pen Tool" className="tool toolSelected pen" tool_class="pen">&nbsp;</div>
            </div>
        );
    }
}

export default ToolSelector;

