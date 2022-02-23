import "../App.css";

/**
 * Clear the localStorage and reload the page (all in frontend).
 * @returns clears the localStorage
 */
export default function TokenClear() {

	// Clear the localStorage and reload the page
	// The page is reloaded in order for the navbar to realize the absence of the token and adjust its menu structure
	localStorage.clear();
	window.location.reload(false);

};
