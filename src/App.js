import React from 'react';
import Whiteboard from './Whiteboard';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import ToolSelector from "./ToolSelector";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Navbar.Brand href="javascript:void(0);"><img src="./../static/logo26.png" /> Whiteboards.live</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item className="NavItemText">
                                <svg
                                    className="bi bi-people-fill" width="22" height="22" viewBox="0 0 16 16"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                                          clip-rule="evenodd"/>
                                </svg> (<span id="participantCount">0</span>)
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Options" id="basic-nav-dropdown" renderMenuOnMount={true} alignRight>
                                <NavDropdown.Item id="aImport" href="javascript:void(0);">Import</NavDropdown.Item>
                                <NavDropdown.Item id="aExport" href="javascript:void(0);">Export</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item id="aHelp" href="javascript:void(0);">Help</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Whiteboard
                    getColor={this.getColor}
                    getSize={this.getSize}
                    getTool={this.getTool}/>

            </React.Fragment>
        );

    }

}

export default App;
