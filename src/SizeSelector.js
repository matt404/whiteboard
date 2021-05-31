import React from "react";
import './SizeSelector.css';

class SizeSelector  extends React.Component {
    constructor(props) {
        super(props);
        this.convertSizeClassToValue = this.convertSizeClassToValue.bind(this);
        this.onSizeUpdate = this.onSizeUpdate.bind(this);
        this.state = {};
    }

    onSizeUpdate(e){
        for(let i = 0; i < this.state.sizes.length; i++){
            let size = this.state.sizes[i];
            size.className = "size " + size.getAttribute("size_class");
        }

        e.target.className = "size sizeSelected " + e.target.getAttribute("size_class");

        let sizeValue = this.convertSizeClassToValue(e.target.getAttribute("size_class"));
        this.props.onChangeSize(sizeValue);
    }

    convertSizeClassToValue(cssClassName){
        //default to small
        switch(cssClassName){
            case "lineMedium":
                return 5;
            case "lineLarge":
                return 13;
            default:
                return 2;
        }
    }

    componentDidMount() {

        let sizes = document.getElementsByClassName('size');

        this.setState({sizes:sizes});

        for (let i = 0; i < sizes.length; i++){
            sizes[i].addEventListener('click', this.onSizeUpdate, false);
        }

    }

    render() {
        return (
            <div className="sizes">
                <div title="Small" className="size sizeSelected lineSmall" size_class="lineSmall">&nbsp;</div>
                <div title="Medium" className="size lineMedium" size_class="lineMedium">&nbsp;</div>
                <div title="Large" className="size lineLarge" size_class="lineLarge">&nbsp;</div>
                <div className="sizeSelectorButton">
                    <svg id="sizeSelectorButton" className="bi bi-chevron-compact-right" width="1em" height="1em" viewBox="0 0 16 16"
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

export default SizeSelector;

