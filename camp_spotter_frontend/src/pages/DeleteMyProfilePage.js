import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import UserDestroy from '../components/UserDestroy';

/**
 * Delete user page of the application.
 * The following components are used:
 * - UserDestroy
 * @returns renders the page
 */
export default function DeleteMyProfilePage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Define the identity variables/constants/states
    const [identity, setIdentity] = useState();
    const [loading, setLoading] = useState(true);
	let navigate = useNavigate();

	// Redirect to the login page if without token
	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	},[]);

	// At page loading fetch data about the user identity, set it to the identity state, log eventual errors and set loading to false
    useEffect (() => {
        fetch ('http://127.0.0.1:8000/identity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        })
        .then (response => response.json())
        .then (result => setIdentity(result))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

	// Render the page
  	return(

		<div>

			{/* Create a header */}
			<h1 className="text-center text-white">Delete Profile</h1>
		
			{/* Insert the UserDestroy component */}
			<div className='overlay'></div>
				<div className='campDetails position-relative'> 
					<div>
						<UserDestroy 
						token={token} 
						slug={identity.slug}
						/>
					</div>
			</div>

			<div style={{ height: "100vh" }}></div>

    	</div>
  	);
};