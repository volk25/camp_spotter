import "../App.css";

/**
 * Delete the user with a DELETE request (only with token, only owner) and reload the current page
 * @param {string} token token of the authenticated user
 * @param {string} slug slug of the user to be deleted
 * @returns user destroy component
 */
export default function UserDestroy(props) {

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

	// Clear the token from localStorage, and reload the page
	// The page is reloaded in order for the navbar and the page to realize the absence of the token and adjust its menu structure
	.finally(() => {
		localStorage.clear();
		window.location.reload(false);
	})

};


