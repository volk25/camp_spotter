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

	// Render the page
	return(

		<div className="bg-success">
			<Map coordinates={params.coordinates}/>
		</div>
	
	)

};
