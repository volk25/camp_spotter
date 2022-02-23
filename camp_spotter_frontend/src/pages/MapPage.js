import React from "react";
import Map from "../components/Map";
import { useParams } from 'react-router-dom'
import NavBar from "../components/NavBar";

/**
 * Render the Map page. 
 * The following components are used:
 * - Navbar
 * - Map
 * @returns renders the page
 */
export default function MapPage() {

	// Define the parameters coming from outside
	const params = useParams()

	// Decode the positionSlug in the URL
	function searchPosition() {
		if (params.positionSlug !== 'localize') {
			return(
				{
					latitude: Number(params.positionSlug.split(',')[0]),
					longitude: Number(params.positionSlug.split(',')[1])
				}				
			)
		} else {
			return null
		}
	};

	// Render the page
	return(
		
		<div className="mt-0">
			{/* Render the Navbar component */}
			<div className='position-relative  mt-0 mb-0  p-0 mapPage'>
				<NavBar/>
			</div>

			<Map position={searchPosition()}/>
		</div>
	
	)

};
