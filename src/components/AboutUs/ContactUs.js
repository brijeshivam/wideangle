import React from "react";
import './ContactUs.css'
function ContactUs() {
    return (

        <div className="mt-10">
            <iframe
                id="JotFormIFrame-243371754029458"
                title="Contact Form"
                onLoad={()=>{
                    window.parent.scrollTo(0,0);
                }}
                allow="geolocation; microphone; camera; fullscreen"
                src="https://form.jotform.com/243371754029458"
                className=" border-none"
                scrolling={"no"}
                style={{ width: '100%', height: '800px', overflow: 'hidden' }}
            >
            </iframe>
            <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
            <script>window.jotformEmbedHandler("iframe[id='JotFormIFrame-243371754029458']",
                "https://form.jotform.com/")
            </script>

        </div>
    )
        ;
}

export default ContactUs;
