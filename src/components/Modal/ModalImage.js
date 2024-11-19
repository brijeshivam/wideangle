import {Component} from "react";
import "./ModalImage.css";
import Select from "react-dropdown-select";
import Spinner from "../Spinner/Spinner";

class ModalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.imageObject ? props.imageObject.urls.regular : "",
            isOpen: props.isOpen,
            selectedSize: [],
            imageObject: props.imageObject ? props.imageObject : "",
            isDownloading: false,

        };
    }

    onClose = () => {
        this.setState({isOpen: false});
    }
    handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (this.state.selectedSize[0]) {
            try {
                this.setState({isDownloading: true});
                const response = await fetch(this.state.imageObject.urls[this.state.selectedSize[0].value], {mode: "cors"});
                const blob = await response.blob();
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "image.jpg"; // Desired file name
                link.click();
                window.URL.revokeObjectURL(link.href); // Clean up the object URL
                this.setState({isDownloading: false});
            } catch (error) {
                console.error("Error downloading the image:", error);
            }
        }
    };

    handleChange = (values) => {
        this.setState({selectedSize: values}); // Update state with selected value
    };

    options = [
        {label: "1080p", value: "regular"},
        {label: "400p", value: "small"},
        {label: "200p", value: "thumb"},
        {label: "Full", value: "full"},
        {label: "Raw", value: "raw"},
    ];

    render() {
        const {isOpen, src, selectedSize,isDownloading} = this.state;
        if (!isOpen) return null;

        return (<>
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={this.onClose}
                >
                    <div
                        className="bg-white shadow-lg max-w-sm max-h-dvh bg-opacity-50 relative fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-purple-900 hover:text-fuchsia-600 text-xl font-extrabold"
                            onClick={this.onClose}
                        ><i className="fa fa-close"></i></button>
                        <img src={src} alt="" className="max-h-dvh"/>
                        <div className="absolute inline-flex bottom-2 right-2 bg-white text-fuchsia-800 font-thin">
                            <Select
                                options={this.options}
                                onChange={this.handleChange}
                                placeholder="Choose Size"
                                dropdownPosition="top"
                                color="#86198f"
                                searchable={false}
                                values={selectedSize}/>
                            <button onClick={this.handleSubmit}
                                    className="bg-purple-900 text-white font-thin shadow-lg px-2 hover:bg-fuchsia-600">
                                Download
                            </button>
                        </div>
                        {isDownloading&&<div className="absolute center"><Spinner/></div>}
                    </div>
                </div>
            </>
        );
    }
}

export default ModalImage;