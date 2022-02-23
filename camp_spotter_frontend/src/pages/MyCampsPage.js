import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import CampList from '../components/CampList';
import NavBar from "../components/NavBar";

/**
* MyCamps page of the application.
* The following components are used:
* - CampList
* @returns renders the page
*/
export default function MyCampsPage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Define the variables/constants/states
    const [identity, setIdentity] = useState();
    const [loading, setLoadingIdentity] = useState(true);
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
        .finally(() => setLoadingIdentity(false));
    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

	// If everything has loaded, render the page
  	return(

		<div>
			{/* Render the Navbar component */}
			<div className='position-relative'>
					<NavBar/>
			</div>

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