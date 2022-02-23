import React from "react";
import Search from "../components/Search";
import NavBar from "../components/NavBar";

/**
 * Render the Home page.
 * The following components are used:
 * - Navbar
 * - Search
 * @returns renders the page
 */
export default function HomePage() {

	// Render the page
	return(

		<div className="background">
			
			{/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar />
			</div>

			{/* Render the search component */}
			<Search />

			<div style={{ height: "100vh" }}></div>

		</div>
	
	)

};
