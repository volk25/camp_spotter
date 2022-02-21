import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import CampList from '../components/CampList';

/**
 * MyCamps page of the application.
 * @returns renders the page
 */
export default function MyCampsPage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Define the identity variables/constants/states
    const [identity, setIdentity] = useState();
    const [loading, setLoadingIdentity] = useState(true);

	// Define the variables/constants/states
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
        .then (result => setIdentity(result))
        .catch((err) => console.log(err))
        .finally(() => setLoadingIdentity(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

	// If everything has loaded, render the page
  	return(

		<div>
		<div className="overlay"></div>

			{/* Create a header */}
			<h1 className="text-center text-white position-relative">My Camps</h1>
		
			{/* Insert the MyCamps component */}
			<div>
				<CampList
				slug={identity.slug}
				/>
			</div>

			<div style={{ height: "100vh" }}></div>

    	</div>
  	);
};