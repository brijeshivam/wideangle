import React, { useState } from "react";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Add form submission logic (e.g., API call)
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" }); // Reset the form
    };

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-purple-500"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-purple-500"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-purple-500"
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold rounded-lg p-3 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ContactUs;
