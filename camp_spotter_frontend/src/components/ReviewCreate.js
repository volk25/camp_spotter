import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.css";

/**
* Renders the review-create form, sends the form data in the body of a POST request (only with token).
* @param {*} props slug of the camp to which the review should belong
* @returns renders the component
*/
 export default function ReviewCreate(props) {

    // Define the parameters coming from outside the component
    const token = localStorage.getItem('token')

    // Define the add review variables/constants/states
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState("");
    const [identity, setIdentity] = useState();
    const [loadingIdentity, setLoadingIdentity] = useState(true);
    const responseOk = useRef(false);

    // Fetch data about the user identity
    useEffect (() => {

        // Fetch the data from the API (keep in mind that the current requesting address should be authorized in the API)
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
            console.log(result);
            setIdentity(result);
        })

        // Catch the error if present and console log it
        .catch((err) => console.log(err))

        // Set to false the loading state
        .finally(() => setLoadingIdentity(false));

    },[]);
    

    /**
    * Review form validator
    * @returns
    */
    function validateReviewForm() {
        return title.length > 0 && body.length > 0;
    };

    /**
    * Event handler for Review submission
    * @param {*} event
    */
    function handleReviewSubmit(event) {

        event.preventDefault();

        // Fetch the data to the API (keep in mind that the current requesting address should be authorized in the API)
        fetch(`http://127.0.0.1:8000/camps/${props.slug}/reviews/`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                title: title,
                body: body,
                rating: rating
            })
        })

		// Process the response
		.then(response => {
			if (response.ok) {
                responseOk.current = true
            };
			return response.json()
		})

		// Reload the page if the reponse was ok, otherwise show toasts with the errors
		// The page is reloaded in order for the submitted review to be shown
		.then((result) => {
			if (responseOk.current) {
				window.location.reload(false)
			} else {
				for(var i in result){
					for(var k in result[i]){
						toast.error(`${i}: ${result[i][k]}`)
					}
				}
			}
		})

		// Catch the other errors if present
		.catch(err => console.log(err))

    };

    // If loading variable is still set to true, notify it to the user
    if (loadingIdentity) {
        return <p>Data is loading...</p>;
    }


    // Render the component
    return (
        
        <div>

            {/* Restrict the possibility to leave reviews only with token */}
            { token ? 
            
                <div className='AddReview'>

                    {/* Initialize the form */}
                    <div className='d-flex justify-content-evenly mb-3'>
                            {/* user image and user name */}
                            <div className='me-3  col-1' >
                                <img src={identity.image} alt="user image" width="70" height= "70" className='rounded-pill'/>
                                <div className=' text-left text-white'>{identity.username}</div>
                            </div>
                            {/* set review title, rating and review body */}
                            <div className=' mb-2 col-11'>
                                <div className='text-white fw-bold ms-4 me-3 reviewInput d-flex justify-content-between'>
                                    <input type='title' value={title} placeholder='Fill in your title' onChange={(e) => setTitle(e.target.value)}></input> 
                                    <input type='rating' value={rating} placeholder='Rate this camp (1-5)' onChange={(e) => setRating(e.target.value)}></input> 
                                </div>
                                <div  className= 'bg-secondary bg-opacity-50 text-white rounded-pill p-3'>
                                    <input type='body' value={body} placeholder='Your message' onChange={(e) => setBody(e.target.value)}></input> 
                                </div>
                            </div>
                        </div>  
                        {/* Submit button */}
                        <div className="text-center">
                            <Button size="lg" type="submit" disabled={!validateReviewForm()} onClick={handleReviewSubmit} className="mt-3 btn-success">Submit</Button>
                        </div>

                   
                
                </div>

            :

                <div className='text-white fw-italic fs-5'>
                Please <Link to="/login" style={{ color: '#055d3d', textDecoration: 'inherit'}}><span className="fw-bold">Login</span></Link> or <Link to="/signup" style={{ color: '#055d3d', textDecoration: 'inherit'}}><span className="fw-bold">Signup</span></Link> for leaving a review!</div>
            
            }

        </div>
    )
};
