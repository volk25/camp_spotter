import React from "react";
import SearchBar from "../components/SearchBar";

/**
 * Render the home page. 
 * @returns renders the page
 */
export default function HomePage() {

	// Render the page
    return(

		<div className="background">
		
			<SearchBar/>
			<div style={{ height: "100vh" }}></div>

		</div>

    );
};
