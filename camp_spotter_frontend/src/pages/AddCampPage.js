import React from 'react';
import "../App.css";
import CampCreate from '../components/CampCreate';

/**
 * Add camp page of the application.
 * @returns renders the page
 */
export default function AddCampPage() {

	// TODO: add here the token and the redirection if without token!

	// Render the page
  	return(

		<div>

			{/* Create a header */}
			<h1 className="text-center text-white">Add Camp</h1>
		
			{/* Insert the CampCreate component */}
			<div>
				<CampCreate/>
			</div>

			<div style={{ height: "5vh" }}></div>

    	</div>
  	);
};