import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Renders the list with all the camps of a user after fetching the data with a GET request (all users are allowed).
 * @param {*} props slug of the user to which the camp list belongs
 * @returns renders the component
 */
export default function CampList(props) {

    // Define the camp variables/constants/states
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the camp list as soon as the page is loaded
    useEffect (() => {

        // Fetch the data from the API
        fetch (`http://127.0.0.1:8000/users/${props.slug}/camps`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to the campList variable
        .then (response => response.json())
        .then (result => setCamps(result))

        // Catch the error if present and set it to the error variable
        .catch((err) => console.log(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

    // If data is loaded, render the component
    return (
        <div className="container w-50 mt-5 position-relative">

            <div className="text-white mt-5 mb-5 h5 text-center">Here you can edit or delete your submitted camps.</div>
       
            {camps.length > 0 ?               
                camps.map(camp => (   /* d-flex justify-content-between */

                    <div className="text-white row mb-4  p-3 radius bg-secondary bg-opacity-50" key={camp.slug}>

                        {/* Create the camp title link */}
                        <Link to={`/camps/${camp.slug}`} style={{ color: '#fff' }} className="col-4">
                            <div className="h4 fw-bold">{camp.title}</div>
                        </Link>

                        {/* Create the created_on info */}
                        <div className="h5 col-5">Created on: <span className="ms-1">{camp.created_on.slice(0,10)}</span></div>

                        {/* Create edit and delete links */}
                        <div className="col-3">
                            <Link to={`/camps/${camp.slug}/edit`}>
                                <button type="button" class="btn btn-secondary me-2">Edit</button>
                            </Link>
                            <Link to={`/camps/${camp.slug}/delete`}>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </Link>
                        </div>
                    </div>
                ))

            /* If user didn't create any camps: */
            :
            <div className='text-white fw-italic fs-5'>You didn't add any camps yet...</div>       
            }

        </div>
    )
}