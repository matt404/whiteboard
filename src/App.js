import React from 'react';
import Whiteboard from './Whiteboard';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector';
import ToolSelector from './ToolSelector';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeColor = this.onChangeColor.bind(this);
        this.getColor = this.getColor.bind(this);

        this.onChangeSize = this.onChangeSize.bind(this);
        this.getSize = this.getSize.bind(this);

        this.onChangeTool = this.onChangeTool.bind(this);
        this.getTool = this.getTool.bind(this);

        this.state = {color:'black',size:2,tool:'pen'};
    }

    onChangeColor(color){
        this.setState({color:color});
    }
    getColor(){
        return this.state.color;
    }

    onChangeSize(size){
        this.setState({size:size});
    }
    getSize(){
        return this.state.size;
    }

    onChangeTool(tool){
        this.setState({tool:tool});
    }
    getTool(){
        return this.state.tool;
    }

    render() {

        return (
            <React.Fragment>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="javascript:void(0);"><img src="./../logo26.png" /> Whiteboards.live</a>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a id="aExport" className="nav-link" href="javascript:void(0);">Export</a>
                        </li>
                    </ul>
                </nav>

                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ColorSelector
                            getColor={this.getColor}
                            onChangeColor={this.onChangeColor}/>
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Line Width</span>
                            <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>
                        <SizeSelector
                            getSize={this.getSize}
                            onChangeSize={this.onChangeSize}/>
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Drawing Tools</span>
                            <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>
                        <ToolSelector
                            getTool={this.getTool}
                            onChangeTool={this.onChangeTool}/>
                    </div>
                </nav>

                <Whiteboard
                    getColor={this.getColor}
                    getSize={this.getSize}
                    getTool={this.getTool}/>

            </React.Fragment>
        );

    }

}

export default App;
