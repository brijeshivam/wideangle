import {useState} from "react";
import "./ModalImage.css";
import Select from "react-dropdown-select";
import Spinner from "../Spinner/Spinner";
import {useSwipeable} from "react-swipeable";

const ModalImage = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [selectedSize, setSelectedSize] = useState([]);
    const [index, setIndex] = useState(props.index);
    const [imageObject, setImageObject] = useState(props.imageObjects[index] ? props.imageObjects[index] : "");
    const [src, setSrc] = useState(imageObject ? imageObject.urls.regular : "");
    const [isDownloading, setIsDownloading] = useState(false);
    const [imgKey, setImgKey] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleDownload = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (selectedSize[0]) {
            try {
                setIsDownloading(true);
                const response = await fetch(imageObject.urls[selectedSize[0].value], {mode: "cors"});
                const blob = await response.blob();
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = `${imageObject.slug}-${selectedSize[0].value}.jpg`;
                link.click();
                window.URL.revokeObjectURL(link.href); // Clean up the object URL
                setIsDownloading(false);
            } catch (error) {
                console.error("Error downloading the image:", error);
            }
        }
    };

    const options = [
        {label: "1080p", value: "regular"},
        {label: "400p", value: "small"},
        {label: "200p", value: "thumb"},
        {label: "Full", value: "full"},
        {label: "Raw", value: "raw"},
    ];
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            console.log('Swiped left!');
            loadNext();

        },
        onSwipedRight: () => {
            console.log('Swiped right!');
            loadPrev()

        },
    });
    const loadPrev = () => {
        if (0 < index - 1) {
            setIsImageLoaded(false);
            setImageObject(props.imageObjects[index - 1]);
            setSrc(props.imageObjects[index - 1].urls.regular);
            setIndex(index - 1);
            setImgKey(imgKey + 1);
            console.log(swipeHandlers);
        }
    }
    const loadNext = () => {
        if (props.imageObjects.length > index + 1) {
            setIsImageLoaded(false);
            setImageObject(props.imageObjects[index + 1]);
            setSrc(props.imageObjects[index + 1].urls.regular);
            setIndex(index + 1);
            setImgKey(imgKey + 1);

        }else{
            setIsDownloading(true);
            props.fetchImages();
            setIsDownloading(false);
        }
    }

    const shareImage = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check this out!',
                    text: 'Check this out!',
                    url: src, // Image URL
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(src);
                alert('Image link copied to clipboard!');
            } catch (err) {
                alert('Unable to share! Try browser\'s inbuilt share options.');
            }
        }
    };

    if (!isOpen) return null;

    return (<>
            <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={() => setIsOpen(false)}
            >
                <div
                    className="bg-white shadow-lg max-w-sm max-h-dvh bg-opacity-50 relative fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img key={imgKey} src={src} alt="" className="max-h-dvh fade-in" {...swipeHandlers}
                         onLoad={() => setIsImageLoaded(true)}/>

                    {isImageLoaded && <div>
                        <div className="absolute inline-flex bottom-2 right-2 bg-white text-fuchsia-800 font-thin">
                            <Select
                                options={options}
                                onChange={(values) => setSelectedSize(values)}
                                placeholder="Choose Size"
                                dropdownPosition="top"
                                color="#86198f"
                                searchable={false}
                                values={selectedSize}/>
                            <button onClick={handleDownload}
                                    className="bg-purple-900 text-white font-thin shadow-lg px-2 hover:bg-fuchsia-600">
                                Download
                            </button>
                        </div>
                        <button
                            className="absolute top-3 right-3 text-purple-700 hover:text-fuchsia-600 text-xl font-extrabold"
                            onClick={() => setIsOpen(false)}
                        ><i className="fa fa-close"></i></button>
                        <i className="arrow right border-purple-700 hover:border-fuchsia-600 cursor-pointer"
                           onClick={loadNext}/>
                        <i className="arrow left border-purple-700 hover:border-fuchsia-600 cursor-pointer"
                           onClick={loadPrev}/>
                        <button
                            className="absolute bottom-3 left-3 text-purple-700 hover:text-fuchsia-600 text-xl"
                            onClick={() => shareImage()}
                        ><i className="fa fa-share-alt"></i></button>
                    </div>}

                    {isDownloading && <div className="absolute center"><Spinner/></div>}
                </div>
            </div>
        </>
    );

}

export default ModalImage;