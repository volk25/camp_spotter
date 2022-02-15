import React from "react";
import MyMap from "../components/Map"

/**
 * Render the map page with all the camps. 
 * @returns renders the page
 */
 export default function MapPage() {

	// Render the page
	return(

		// Render the MyMap component
		<div className="bg-success">
			<MyMap/>
		</div>
    
  	);
};

