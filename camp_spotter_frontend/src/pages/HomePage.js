import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Map from "../components/Map"

/**
 * Render the home page (Map or Search). 
 * @returns renders the page
 */
export default function HomePage() {

	const [finalUserInput, setFinalUserInput] = useState('')
	const [content, setContent] = useState('')

	// As soon as the user clicks on search button the map page will be loaded
	useEffect (() => {

		function conditionalContent() {
			if (!finalUserInput) {
				setContent(
					<div className="background">
						<Search setFinalUserInput={setFinalUserInput} />
						<div style={{ height: "100vh" }}></div>
					</div>
				)
			} else {
				setContent(
					<div className="bg-success">
						<Map finalUserInput={finalUserInput}/>
					</div>				
				)
			};
		};
		conditionalContent()
	
	},[finalUserInput]);

	// Render the page
	return(
		<div>
			{content}	
		</div>
	
	)

};
