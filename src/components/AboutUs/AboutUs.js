import React from "react";
import ContactUs from "./ContactUs";

function AboutUs() {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
                    About Us
                </h2>
                <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
                    Welcome to <span className="font-semibold text-purple-600">Wide Angle</span>, your ultimate destination for stunning photography.
                    Our mission is to capture the beauty of the world through the lens and provide an immersive visual experience.
                </p>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Mission Icon"
                            className="w-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            Our Mission
                        </h3>
                        <p className="text-gray-600 text-center">
                            To inspire creativity and bring moments to life through the art of photography.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Vision Icon"
                            className="w-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            Our Vision
                        </h3>
                        <p className="text-gray-600 text-center">
                            To become the leading platform for photographers and enthusiasts worldwide.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Values Icon"
                            className="w-20 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            Our Values
                        </h3>
                        <p className="text-gray-600 text-center">
                            We believe in quality, creativity, and making lasting memories.
                        </p>
                    </div>
                </div>
            </div>
            <ContactUs/>
        </section>
    );
}

export default AboutUs;
