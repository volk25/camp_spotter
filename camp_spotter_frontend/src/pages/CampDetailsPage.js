import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import "../App.css";
import CampRetrieve from '../components/CampRetrieve';
import ReviewList from '../components/ReviewList';
import ReviewCreate from '../components/ReviewCreate';
import NavBar from "../components/NavBar";

/**
 * Render the camp details page.
 * The following components are used:
 * - Navbar
 * - CampRetrieve
 * - ReviewList
 * - ReviewCreate 
 * @returns renders the page
 */
 export default function CampDetailsPage() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')
    const params = useParams()

	// Define the identity variables/constants/states
    const [identity, setIdentity] = useState();
    const [loading, setLoading] = useState(true);

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

    // If loading state is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

    // If everything has loaded, render the page
    return (
        
        <div> 
            {/* Render the Navbar component */}
			<div className='position-relative'>
				<NavBar/>
			</div>

            <div className='campDetails position-relative'>           
 
                {/* General details of the camp of the camp */}
                <div>
                    <CampRetrieve 
                    slug={params.slug} 
                    />
                </div>

                {/* Insert the list with reviews of the camp, if present */}
                <div className='text-white fw-bold fs-2 mb-3'>Reviews</div>
                <div>
                    <ReviewList 
                    token={token}
                    identity={identity}
                    slug={params.slug}
                    />
                </div>

                {/* Insert an add-review section  */}
                <div className='text-white fw-bold fs-2 mb-3 mt-3'>Add your review</div>
                <ReviewCreate 
                token={token}
                slug={params.slug}
                identity={identity}/>
      
            </div> 
            <div style={{ height: "50vh" }}></div>

        </div>
    )
};
