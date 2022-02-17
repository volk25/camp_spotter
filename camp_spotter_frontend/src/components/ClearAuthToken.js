import "../App.css";

/**
 * Clear the localStorage and reload the page.
 * @returns clears the localStorage
 */
export default function ClearAuthToken() {

	// Clear the localStorage and reload the page
	// The page is reloaded in order for the navbar to realize the absence of the token and adjust its menu structure
	localStorage.clear();
	window.location.reload(false);

	return 
};
