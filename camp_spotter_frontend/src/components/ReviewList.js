import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";

/**
 * Renders the list with all the reviews of a camp after fetching the data with a GET request (all users are allowed).
 * @param {*} props slug of the camp to which the review list should belongs
 * @returns renders the component
 */
 export default function ReviewList(props) {

    // Define the review list variables/constants/states
    const [reviewList, setReviewList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    // Define what to do when the component is loaded
    useEffect (() => {

        // Fetch the data from the API (keep in mind that the current requesting address should be authorized in the API)
        fetch (`http://127.0.0.1:8000/camps/${props.slug}/reviews/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to the reviewList variable
        .then (response => response.json())
        .then (data => setReviewList(data))

        // Catch the error if present and set it to the error variable
        .catch((err) => setError(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }
    if (error) {
        return <p>An error occurred while loading the Review List!</p>;
    }

    // Render the component
    return (
        
        <div> 

            {/* Render the reviews of the camp, if some are present */}
            { reviewList.length > 0 ?

                reviewList.map(review => (                      
                    <div key={review.id}>                       
                        <div className='d-flex justify-content-evenly'  >
                            <div className='me-3'>
                                <img src={review.author_image} alt="user image" width="70" height= "70"/>
                                <div className='w-25 text-center text-black'>
                                    {review.author}
                                </div>
                            </div>
                            <div className= 'p-3 mb-2 bg-secondary bg-opacity-50 text-white rounded-pill w-75'>
                                {review.body}
                            </div>   
                        </div>    
                    </div>  
                ))
            :

                <div className='text-white fw-italic fs-5'>This camp site has no reviews yet...</div>
            }

        </div>
    )
};
