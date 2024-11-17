import React, { Component } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import "./Grid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import ModalImage from "../Modal/ModalImage";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: false,
            hasMore: true,
            page: 1,
            isOpen: false,
            imageObject:null,
            imageObjects:[]
        };



    }

    // Fetch images from the API
    fetchImages = async () => {
        const { page,loading, hasMore } = this.state;
        console.log("fetch image ", page);
        const url = `https://api.unsplash.com/photos?per_page=20&client_id=C-Xf4gXPCCVHwlDW13G0r3YXosLhYIrL6wbrDmrMxL0&page=${page}`;
        try {
            if (loading || !hasMore) return; // If already loading or no more images, don't fetch

            this.setState({ loading: true });

            const response = await axios.get(url);
            const newImages = response.data.map((item) => item.urls.small);
            const newObj = response.data;
            if (newImages.length > 0) {
                this.setState((prevState) => ({
                    images: [...prevState.images, ...newImages],
                    imageObjects: [...prevState.imageObjects, ...newObj],
                    hasMore: true, // More images are available
                    page: prevState.page + 1,
                }));
            } else {
                this.setState({ hasMore: false }); // No new images to load
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            this.setState({ loading: false });
        }
    };
    // Load initial images on component mount
    componentDidMount() {
        this.fetchImages();
    }
    openImage = (imageObj)=>{
        this.setState({imageObject: imageObj});
        this.setState({isOpen:true});
        console.log(this.state.imageObject);
    }
    render() {
        const { images, hasMore,imageObject,isOpen,imageObjects } = this.state;

        return (
            <div className={`container mx-auto my-5 p-2 bg-purple-900 fade-in shadow-2xl shadow-black`}>
                <ModalImage key={!imageObject?"":imageObject.id} imageObject={imageObject} isOpen={isOpen} />
                <InfiniteScroll
                    dataLength={images.length}
                    next={this.fetchImages}
                    hasMore={hasMore}
                    loader={<Spinner />}
                    initialScrollY={2}
                >
                    <Masonry
                        breakpointCols={{
                            default: 6,
                            1200: 6,
                            900: 5,
                            750: 4,
                            350: 3,
                        }}
                        className="my-masonry-grid bg-purple-900"
                        columnClassName="my-masonry-grid_column"
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`${index + 1}`}
                                className="masonry-image fade-in cursor-pointer transition-transform duration-300 hover:scale-110"
                                loading="lazy"
                                onClick={()=>this.openImage(imageObjects[index])}
                            />
                        ))}
                    </Masonry>
                </InfiniteScroll>
            </div>
        );
    }
}

export default Grid;
