import React from "react";
import Search from "../components/Search";

/**
* Render the Home page. 
* @returns renders the page
*/
export default function HomePage() {

	// Render the page
	return(

		<div className="background">
			<Search />
			<div style={{ height: "100vh" }}></div>
		</div>
	
	)

};
