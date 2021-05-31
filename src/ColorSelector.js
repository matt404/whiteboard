import React from "react";
import './ColorSelector.css';

class ColorSelector  extends React.Component {
    constructor(props) {
        super(props);
        this.onColorUpdate = this.onColorUpdate.bind(this);
        this.state = {};
    }

    onColorUpdate(e){
        for(let i = 0; i < this.state.colors.length; i++){
            let color = this.state.colors[i];
            color.className = "color " + color.getAttribute("color_class");
        }

        this.props.onChangeColor(e.target.getAttribute("color_class"));

        e.target.className = "color colorSelected " + e.target.getAttribute("color_class");
    }

    componentDidMount() {
        let colors = document.getElementsByClassName('color');

        this.setState({colors:colors});

        for (let i = 0; i < colors.length; i++){
            colors[i].addEventListener('click', this.onColorUpdate, false);
        }
    }

    render() {
        return (
            <div className="colors">
                <div title="Black" className="color colorSelected black" color_class="black">&nbsp;</div>
                <div title="Red" className="color red" color_class="red">&nbsp;</div>
                <div title="Green" className="color green" color_class="green">&nbsp;</div>
                <div title="Blue" className="color blue" color_class="blue">&nbsp;</div>
                <div title="Yellow" className="color yellow" color_class="yellow">&nbsp;</div>
                <div title="Purple" className="color purple" color_class="purple">&nbsp;</div>
                <div className="colorSelectorButton">
                    <svg id="colorSelectorButton" className="bi bi-chevron-compact-right" width="1em" height="1em" viewBox="0 0 16 16"
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

export default ColorSelector;

