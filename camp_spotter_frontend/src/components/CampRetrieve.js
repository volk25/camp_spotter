import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Rating from '@mui/material/Rating';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import "../App.css";
import { GetIcon } from './Map';

/**
 * Render the camp retrieve component.
 * @param {*} props slug of the requested camp
 * @returns renders the component
 */
 export default function CampRetrieve(props) {

    // Define the camp variables/constants/states
    const [campDetails, setCampDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    // Define what to do when the component is loaded
    useEffect (() => {

        // Fetch the data from the API
        fetch (`http://127.0.0.1:8000/camps/${props.slug}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to the campList variable
        .then (response => response.json())
        .then (result => setCampDetails(result))

        // Catch the error if present and set it to the error variable
        .catch((err) => console.log(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }
    
    // If data is loaded, render the component
    return (
        
        <div>

            {/* Camp image with camp name displayed on it */}
            <div className="position-relative text-center mt-5" >
                <img src={campDetails.image} className="radius" width="100%" height= "200" alt="mainCampImage"/>
                <div className='box bg-secondary bg-opacity-75'>
                    <div className="position-absolute  d-flex justify-content-between bottom-0 start-50 translate-middle-x  text-white fs-2 bg-secondary bg-opacity-50  w-100">
                        <div className='ms-4'>{campDetails.title}</div>
                        <Rating className='me-3 mt-2' name="read-only" precision={0.5} value={campDetails.rating} readOnly />
                    </div>
                </div>
            </div>
            
            {/* Details of the camp */}
            <div className='mt-3 mb-3 p-3 text-white h5 bg-secondary bg-opacity-50 radius'>
                {campDetails.main_body}
            </div>
            <div className='d-flex mb-3'>
                <div className= 'radius p-3 mb-2 bg-secondary bg-opacity-50 text-white h6 w-50'>
                    {campDetails.position_body}
                </div>  
                <div className='w-50 ms-2 radius bg-secondary bg-opacity-50 h6'>
                    <MapContainer className="map" center={[campDetails.latitude, campDetails.longitude]} zoom={20} style={{height:"30vh"}}> 
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                            contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
                        <Marker position={[campDetails.latitude, campDetails.longitude]} icon={GetIcon(50)}/>
                    </MapContainer>      
                </div>                           
            </div>

        </div>

    )
};
