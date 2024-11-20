import React, {Component} from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import "./Grid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner/Spinner";
import ModalImage from "../Modal/ModalImage";
import NotFound from "../Errors/NotFound";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: false,
            hasMore: true,
            page: this.props.page,
            isOpen: false,
            index: null,
            imageObjects: [],
            currentLocation: this.props.location,
            key: 0
        };

    }

    // Fetch images from the API
    fetchImages = async () => {
        const {page, loading, hasMore, currentLocation} = this.state;
        let url;
        let response;
        let newImages;
        let newObj;
        if (currentLocation.search !== '') {
            url = `https://api.unsplash.com/search/photos${currentLocation.search}&per_page=20&client_id=C-Xf4gXPCCVHwlDW13G0r3YXosLhYIrL6wbrDmrMxL0&page=${page}`
            response = await axios.get(url);
            newImages = response.data.results.map((item) => item.urls.small);
            newObj = response.data.results;
        } else {
            url = `https://api.unsplash.com/photos?per_page=20&client_id=C-Xf4gXPCCVHwlDW13G0r3YXosLhYIrL6wbrDmrMxL0&page=${page}`;
            response = await axios.get(url);
            newImages = response.data.map((item) => item.urls.small);
            newObj = response.data;
        }
        try {
            if (loading || !hasMore) return; // If already loading or no more images, don't fetch

            this.setState({loading: true});

            if (newImages.length > 0) {
                this.setState((prevState) => ({
                    images: [...prevState.images, ...newImages],
                    imageObjects: [...prevState.imageObjects, ...newObj],
                    hasMore: true, // More images are available
                    page: prevState.page + 1,
                }));
            } else {
                this.setState({hasMore: false}); // No new images to load
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            this.setState({loading: false});
        }
    };

    // Load initial images on component mount
    componentDidMount() {
        this.fetchImages();
    }

    openImage = (index) => {
        this.setState({index: index});
        this.setState({isOpen: true});
        this.setState((prev) => ({key: prev.key + 1}));
    }

    render() {
        const {images, hasMore, index, isOpen, imageObjects, key} = this.state;
        if(images.length === 0 && !hasMore) {
                return (
                    <div className={` my-1 p-1 fade-in absolute left-0 top-14 w-full justify-items-center`}>
                        <NotFound/>
                    </div>
                );
        }
        return (
            <div className={` my-1 p-1 fade-in absolute left-0 top-14 w-full`}>
                <ModalImage key={key} imageObjects={imageObjects} index={index} isOpen={isOpen} fetchImages={this.fetchImages} />
                <InfiniteScroll
                    dataLength={images.length}
                    next={this.fetchImages}
                    hasMore={hasMore}
                    loader={<Spinner/>}
                    initialScrollY={2}

                >
                    <Masonry
                        breakpointCols={{
                            default: 5,
                            1200: 4,
                            900: 3,
                            750: 2,
                            350: 1,
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
                                onClick={() => this.openImage(index)}
                            />
                        ))}
                    </Masonry>
                </InfiniteScroll>
            </div>
        )
            ;
    }
}

export default Grid;
