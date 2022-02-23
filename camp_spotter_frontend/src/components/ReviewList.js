import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Rating from '@mui/material/Rating';
import "../App.css";
import DeleteReviewDialog from '../dialogs/DeleteReviewDialog';

/**
 * Renders the list with all the reviews of a camp after fetching the data with a GET request (all users are allowed).
 * The following components are used:
 * - DeleteReviewDialog
 * @param {string} token token of the current user
 * @param {object} identity identity of the current user
 * @param {string} slug slug of the camp to which the review list belongs
 * @returns renders the component
 */
 export default function ReviewList(props) {

    // Define the review list variables/constants/states
    const [reviewList, setReviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define the dialog variables/constants/states
    const [openDialog, setOpenDialog] = useState(false);
    const [slugDialog, setSlugDialog] = useState();
    const [idDialog, setIdDialog] = useState();

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
        .finally(() => setLoading(false));

    },[]);

    /**
	 * Event handler for opening deletion dialog
     * @param {string} slug slug of the camp to which belongs the review
     * @param {number} id id of the review to be deleted
     * 
     * @returns calls the function for camp deletion
	 */
     function handleOpenDialog(props) {
        setSlugDialog(props.slug);
        setIdDialog(props.id);
        setOpenDialog(true);
    };

    // If loading state is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }

    // If everything has been loaded, render the component
    return (
        
        <div> 

            {/* Render the reviews of the camp, if some are present */}
            { reviewList.length > 0 ?

                reviewList.map(review => (

                    <div key={review.id}>  
                                        
                        <div className='d-flex justify-content-evenly mb-3'>

                            {/* Create user image and username */}
                            <div className='me-3 col-1' >
                                <img src={review.author_image} alt='user image' width='70' height= '70' className='rounded-pill'/>
                                <div className='text-center text-white'>{review.author}</div>
                            </div>

                            {/* Create review title, rating and review body */}
                            <div className="mb-2 col-11">

                                {/* Create the review title and the star rating */}
                                <div className="d-flex justify-content-between me-3">
                                    <div className='text-white fw-bold ms-4 me-3'>{review.title}</div>
                                    <Rating 
                                    name="read-only" 
                                    size="small" 
                                    value={review.rating} 
                                    readOnly />
                                </div>

                                {/* Create the review body */}
                                <div className='bg-secondary bg-opacity-50 text-white rounded-pill p-3 d-flex justify-content-between'>
                                    <span>{review.body}</span>

                                    {/* If the current user is the author of the review create the delete button */}
                                    { props.identity.username === review.author ?
                                        <button
                                        className='btn btn-outline-danger rounded-pill'
                                        type='button' 
                                        onClick={() => handleOpenDialog({slug: props.slug, id: review.id, token: props.token})}>
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

            };

            {/* Delete review dialog */}
            <DeleteReviewDialog 
            openDialog={openDialog} 
            setOpenDialog={setOpenDialog}
            token={props.token} 
            slug={slugDialog}
            id={idDialog}/>

        </div>
    )
};
