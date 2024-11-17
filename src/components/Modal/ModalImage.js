import {Component} from "react";
import "./ModalImage.css";

class ModalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.imageObject ? props.imageObject.urls.regular : "",
            isOpen: props.isOpen,
            visible: "hidden",
            selectedSize:null

        };
    }

    onClose = () => {
        this.setState({isOpen: false});
    }
    handleSubmit = (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            if (this.state.selectedSize) {
                // Open a new page with the selected car as a parameter
                window.open(`${this.state.selectedSize}`, "_blank");
            } else {
                // alert("Please select a car!");
            }
        };

    handleChange = (event) => {
            this.setState({selectedSize:event.target.value}); // Update state with selected value
        };

    render() {
        const {isOpen, src} = this.state;
        console.log("ModalImage", src);
        if (!isOpen) return null;
        return (
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={this.onClose}
            >
                <div
                    className="bg-white shadow-lg w-11/12 max-w-md p-10 relative fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                        onClick={this.onClose}
                    >&times;</button>
                    <img src={src} alt="" className="p-12"/>
                    <div className="justify-items-center ">
                        <form onSubmit={this.handleSubmit} >
                            <select name="size" id="size" onChange={this.handleChange} value={this.selectedSize} className="bg-purple-900 border-none text-white font-thin shadow-lg p-2">
                                <option value="" className="font-thin">Choose Size</option>
                                <option value={this.props.imageObject.urls.regular} className="font-thin">1080p</option>
                                <option value={this.props.imageObject.urls.small} className="font-thin hover:bg-fuchsia-600">400p</option>
                                <option value={this.props.imageObject.urls.thumb} className="font-thin hover:bg-fuchsia-600">200p</option>
                                <option value={this.props.imageObject.urls.full} className="font-thin hover:bg-fuchsia-600">Full</option>
                                <option value={this.props.imageObject.urls.raw} className="font-thin hover:bg-fuchsia-600">Raw</option>
                            </select>
                            <button type="submit" className="ml-2 bg-purple-900 text-white font-thin shadow-lg p-2 hover:bg-fuchsia-600">
                                Download
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default ModalImage;