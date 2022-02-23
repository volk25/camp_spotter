import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default  function ThankYouPage() {
    return(
        <div>
            {/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>
            
            <div className="text-white text-center h3 mt-4">Thank you for your submission!</div>
            <div className="fw-bold text-center h5"><Link to="/map/localize" style={{ color: '#055d3d', textDecoration: 'inherit'}}>Return to the map</Link></div>
            <div style={{ height: "100vh" }}></div>
        </div>
    )
}