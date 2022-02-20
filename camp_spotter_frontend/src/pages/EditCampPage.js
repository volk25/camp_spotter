import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import CampUpdate from '../components/CampUpdate';

/**
 * Edit user profile page of the application.
 * @returns renders the page
 */
export default function EditProfilePage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Define the identity variables/constants/states
    const [identity, setIdentity] = useState();
    const [loading, setLoading] = useState(true);

	// Define the variables/constants/states
	let navigate = useNavigate();

	// Define the parameters coming from outside
    const params = useParams()

	/**
	* Redirect to the login page if without token
	*/
	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
		
	},[]);

	// Render the page
  	return(

		<div>

			{/* Create a header */}
			<h1 className="text-center text-white">Edit Camp</h1>
		
			{/* Insert the CampUpdate component */}
			<div className='overlay'></div>
				<div className='campDetails position-relative'> 
					<div>
						<CampUpdate 
						token={token} 
						campSlug={params.slug}
						/>
					</div>
			</div>

			<div style={{ height: "100vh" }}></div>

    	</div>
  	);
};