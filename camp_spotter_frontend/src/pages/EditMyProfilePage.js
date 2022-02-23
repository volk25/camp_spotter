import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import UserUpdate from '../components/UserUpdate';
import NavBar from "../components/NavBar";

/**
 * Edit user profile page of the application.
 * The following components are used:
 * - Navbar
 * - UserUpdate
 * @returns renders the page
 */
export default function EditMyProfilePage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Define the variables/constants/states
    const [identity, setIdentity] = useState();
    const [loading, setLoading] = useState(true);
	let navigate = useNavigate();

	// Redirect to the login page if without token
	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	},[]);

	// Fetch data about the user identity
    useEffect (() => {

        // Fetch the data from the API
        fetch ('http://127.0.0.1:8000/identity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        })

        // Get the response in a json format, set the resullt to the identity state, catch the eventual error and set the loading to false
        .then (response => response.json())
        .then (result => {setIdentity(result)})
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    };

	// Render the page
  	return(

		<div>
			{/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>

			{/* Create a header */}
			<h1 className="text-center text-white">Edit Profile</h1>
		
			{/* Insert the UserUpdate component */}
			<div>
				<UserUpdate 
				token={token} 
				slug={identity.slug}
				/>
			</div>

			<div style={{ height: "5vh" }}></div>

    	</div>
  	);
};