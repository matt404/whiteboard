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
                <div title="Pen Tool" className="tool toolSelected pen" tool_class="pen">
                    <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                              clip-rule="evenodd"/>
                        <path fill-rule="evenodd"
                              d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>
                <div className="toolSelectorButton">
                    <svg id="toolSelectorButton" className="bi bi-chevron-compact-right" width="1em" height="1em" viewBox="0 0 16 16"
                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>
            </div>
        );
    }
}

export default ToolSelector;

