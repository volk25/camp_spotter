import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";
import ReviewDestroy from './ReviewDestroy';

/**
 * Renders the list with all the reviews of a camp after fetching the data with a GET request (all users are allowed).
 * @param {*} props slug of the camp to which the review list should belongs
 * @returns renders the component
 */
 export default function ReviewList(props) {

    // Define the parameters coming from outside the component
    const token = localStorage.getItem('token')

    // Define the review list variables/constants/states
    const [identity, setIdentity] = useState()
    const [reviewList, setReviewList] = useState([]);
    const [loadingIdentity, setLoadingIdentity] = useState(true);
    const [loadingReviewList, setLoadingReviewList] = useState(true);

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

        // Get the response in a json format and set the data to the identity state
        .then (response => response.json())
        .then (result => {
            setIdentity(result);
        })

        // Catch the error if present and console log it
        .catch((err) => console.log(err))

        // Set to false the loading state
        .finally(() => setLoadingIdentity(false));

    },[]);

    // Fetch data about review list
    useEffect (() => {

        // Fetch the data from the API
        fetch (`http://127.0.0.1:8000/camps/${props.slug}/reviews/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to the reviewList variable
        .then (response => response.json())
        .then (result => setReviewList(result))

        // Catch the error if present and set it to the error variable
        .catch((err) => console.log(err))

        // Set to false the loading variable
        .finally(() => setLoadingReviewList(false));

    },[]);

	/**
	 * Event handler for Review deletion.
	 * @param {*} props slug of the camp and id of the review
	 */
    function handleDelete(props) {
        ReviewDestroy({slug: props.slug, id: props.id});
    };

    // If loading variable is still set to true, notify it to the user
    if (loadingReviewList || loadingIdentity) {
        return <p>Data is loading...</p>;
    }

    // Render the component
    return (
        
        <div> 

            {/* Render the reviews of the camp, if some are present */}
            { reviewList.length > 0 ?

                reviewList.map(review => (                      
                    <div key={review.id}>  
                                        
                        <div className='d-flex justify-content-evenly mb-3'>

                            {/* user image and user name */}
                            <div className='me-3  col-1' >
                                <img src={review.author_image} alt='user image' width='70' height= '70' className='rounded-pill'/>
                                <div className='text-left text-white'>{review.author}</div>
                            </div>

                            {/* review title, rating and review body */}
                            <div className=' mb-2 col-11'>

                                {/* Create the review title and the star rating */}
                                <div className=''>
                                    <span className='text-white fw-bold ms-4 me-3'>{review.title}</span>
                                    { [...Array(review.rating)].map((e, i) => <i className='fas fa-star text-success'></i>)}
                                </div>

                                {/* Create the review body */}
                                <div className='bg-secondary bg-opacity-50 text-white rounded-pill p-3 d-flex justify-content-between'>
                                    <span>{review.body}</span>  

                                    {/* If the current user is the author of the review create the delete button */}
                                    { identity.username === review.author ?
                                        <button 
                                        className='btn btn-outline-danger rounded-pill' 
                                        type='button' onClick={() => handleDelete({slug: props.slug, id: review.id})} >
                                        Delete
                                        </button>
                                    :
                                        <></>
                                    }
                                    
                                </div>
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
