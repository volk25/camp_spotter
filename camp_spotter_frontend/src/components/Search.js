import React, { useEffect, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Link } from "react-router-dom";
import "../App.css";

/**
 * Renders the search bar with search and locate-me buttons..
 * @param {*} props setFinalUserInput function
 * @returns renders the component
 */
export default function Search(props) {

    // Define the variables/constants/states
    const [userInput, setUserInput] = useState("");
    const [datalist, setDatalist] = useState([]);
    const setFinalUserInput = props.setFinalUserInput

    // Initialize a new Map Provider
    const provider = new OpenStreetMapProvider();

    // Define what to do when the page is loaded and at every userInput change
    useEffect(() => {

        // Fetch the search results
        provider.search({ query: userInput })

        // Store the suggested labels in the state
        .then((results) => {
            var labels = results.map(function(i) {
                return i.label;
            });
            setDatalist(labels)
        })
    }, [userInput])

	/**
	 * Event handler for Search event.
	 * @param {*} props userInput
	 */
     function handleSearch() {
        setFinalUserInput(userInput)
    };

    // Render the component
    return (

        <div className='search-bar text-center'>

            {/* Create the input field and its suggestions*/}
            <input 
            type="text" 
            list="data" 
            style={{width: 400}}
            onChange={(e) => {
                e.preventDefault();
                setUserInput(e.target.value);
            }}/>
            <datalist id="data">
                { datalist.map((place) =>
                    <option value={place} />
                )}
            </datalist>

            {/* Add the search button */}
            <button className='btn' type='button' onClick={handleSearch} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-search ms-2" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>

            {/* Add the locate-me link */}
            <Link to="/map">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-cursor-fill ms-3" viewBox="0 0 16 16">
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                </svg>
            </Link>

            <div style={{ height: "70vh" }}></div>

        </div>
   
    )
}
