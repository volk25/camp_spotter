import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default  function MyCamps (props) {

    // Define the camp variables/constants/states
    const [camps, setCamps] = useState([]);
    const [campsError, setCampsError] = useState();
    const [campsLoading, setCampsLoading] = useState(true);

    // Define what to do when the component is loaded
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
        .catch((err) => setCampsError(err))

        // Set to false the loading variable
        .finally(() => setCampsLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (campsLoading) {
        return <p>Data is loading...</p>;
    }
    // If there are no errors
    if (campsError) {
        return <p>An error occurred while loading the your camps!</p>;
    }
    return (
        <div className="container w-50 mt-5 position-relative">
       
            {camps.length > 0 ?               
                camps.map(camp => (
                <div className="text-white d-flex justify-content-between mb-5" key={camp.slug}>
                    <Link to={`/camps/${camp.slug}`} style={{ color: '#055d3d' }}>
                        <div className="h4 fw-bold">{camp.title}</div>
                    </Link>
                    <div className="h5">Created on: <span className="ms-1">{camp.created_on.slice(0,10)}</span></div>
                    <div>
                        <Link to={`/camps/edit/${camp.slug}`}>
                            <button type="button" class="btn btn-secondary me-2">Edit Camp</button>
                        </Link>
                        <button type="button" class="btn btn-danger">Delete Camp</button>
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