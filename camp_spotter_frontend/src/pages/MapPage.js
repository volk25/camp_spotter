import React from "react";
import Map from "../components/Map";
import { useParams } from 'react-router-dom'

/**
 * Render the Map page. 
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
		
		<div className="bg-success">
			<Map position={searchPosition()}/>
		</div>
	
	)

};