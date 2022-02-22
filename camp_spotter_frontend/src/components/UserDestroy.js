import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

/**
 * Renders the user-destroy confirmation, deletes the user with a DELETE request (only with token, only owner).
 * @param {*} props token of the authenticated user and slug of the user to be deleted
 * @returns camp destroy component
 */
export default function UserDestroy(props) {

	// Define the variables/constants/states
	let navigate = useNavigate();

	/**
	 * Event handler for element deletion
	 * @param {*} event
	 */
	function handleDelete(event) {
		
		// Fetch the data to the API
		fetch(`http://127.0.0.1:8000/users/${props.slug}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${props.token}`
			}
		})

        // Process the response
        .then(response => response.json())

        // Catch the other errors if present
        .catch(err => console.log(err))

		// Clear the token from localStorage, redirect, and reload the page.
		// The page is reloaded in order for the navbar to realize the absence of the token and adjust its menu structure
		.finally(() => {
			localStorage.clear();
			navigate('/');
			window.location.reload(false);
		})

	};

	// Render the component
  	return(

    	<div className="addcampForm">

			{/* Create the confirmation message and the Cancel and Delete buttons */}
			<div className="mt-5 text-center">
				<div className="text-white mt-5 mb-5 h5">Are you sure that you want to permanently delete your profile?</div>
				<Link to={`/myprofile`}>
					<button type="button" class="btn btn-secondary me-5">Cancel</button>
				</Link>
      			<button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
    		</div>

    	</div>

  	);
};

