import React from "react";
import { Link } from "react-router-dom";

export default  function ThankYouPage() {
    return(
        <div className="mt-5">
            <div className="text-white text-center h3">Thank you for your submission!</div>
            <div className="fw-bold text-center h5"><Link to="/map" style={{ color: '#055d3d', textDecoration: 'inherit'}}>Return to the map</Link></div>
            <div style={{ height: "100vh" }}></div>
        </div>
    )
}