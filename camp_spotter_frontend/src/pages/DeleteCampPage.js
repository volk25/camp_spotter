import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import CampDestroy from '../components/CampDestroy';

/**
 * Delete camp page of the application.
 * @returns renders the page
 */
export default function DeleteCampPage() {

	// Define the parameters coming from outside the component
	const params = useParams()
	const token = localStorage.getItem('token')

	// Define the variables/constants/states
	let navigate = useNavigate();

	// Redirect to the login page if without token
	useEffect(() => {
		if (!token) {
			navigate('/login')
		};
	},[]);

	// Render the page
  	return(

		<div>

			{/* Create a header */}
			<h1 className="text-center text-white">Delete Camp</h1>
		
			{/* Insert the CampDestroy component */}
			<div className='overlay'></div>
				<div className='campDetails position-relative'> 
					<div>
						<CampDestroy 
						token={token} 
						slug={params.slug}
						/>
					</div>
			</div>

			<div style={{ height: "100vh" }}></div>

    	</div>
  	);
};