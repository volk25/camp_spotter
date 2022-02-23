import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { AlgoliaProvider } from 'leaflet-geosearch';
import { toast } from 'react-toastify';
import LocationMarker from "./Geolocation.js"
import SearchControl from './SearchControl.js';

/**
 * Render the map component.
 * @param {object} position coordinates of the user inputted location
 * @returns renders the conponent
 */
export default function Map(props) {

    // Define the variables/constants/states
    const prov = new AlgoliaProvider();
    const [campList, setCampList] = useState([]); 
    const [loading, setLoading] = useState(true);

    // Set the initial position
    function initialPosition() {
        if (props.position){
            return([props.position.latitude, props.position.longitude])
        } else {
            return([52.3676, 4.9041]) // Amsterdam coordinates to be used before location is determined
        }
    };

    // Fetch the camp list as soon as the page is loaded
    useEffect (() => {

        // Fetch the data from the API
        fetch ('http://127.0.0.1:8000/camps/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // Get the response in a json format and set the data to campList variable
        .then (response => response.json())
        .then (result => {
            setCampList(result)
            toast.success('Welcome! Here you can browse to your perfect camping spot, have fun!')
        })
        
        // Catch the error if present and console log it
        .catch((err) => console.log(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
    }
   
    // If data is loaded, show the map page
    return (
       
        <div>

            {/* Create the map and making it fit 100% of the page */}
            <MapContainer className="map" center={[initialPosition()[0], initialPosition()[1]]} zoom={10} style={{height:"100vh", width: "100%"}}> 
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
                    contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />  
        
                {/* Localize the user if no position has been passed from the search page */}
                { props.position === null ? <LocationMarker /> : <></> }

                {/* Create a search bar on the map */}
                <SearchControl 
                provider={prov}
                style={'bar'}
                showMarker={true}
                showPopup={true}
                // maxMarkers={10}
                retainZoomLevel={true}
                animateZoom={true}
                autoClose={true}
                searchLabel={"Search"}
                keepResult={false}
                // position={"topright"}
                />

                {/* Add markers to the map */}
                {campList.map((camp) => (
                    <Marker 
                    position={[camp.latitude, camp.longitude]} 
                    icon={GetIcon(50)} 
                    key={camp.slug}>
                        <Popup>
                            <Link to ={`/camps/${camp.slug}`}>
                                <div className="position-relative">
                                    <img 
                                    className="tentIcon"
                                    src={camp.image} 
                                    alt={`${camp.title} image`} 
                                    width='200' 
                                    height= '170' 
                                    style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)"}}/>
                                    <img 
                                    className='bottom-0 start-50 translate-middle-x position-absolute'
                                    src={require('../images/Icons/cut.png')} 
                                    width='260' 
                                    height= '230'/>
                                    <div 
                                    className="position-absolute text-center bottom-1 start-50 translate-middle-x fw-bold h6"
                                    style={{ color: "#055d3d" }}>
                                    {camp.title}
                                    </div>  
                                </div>
                            </Link> 
                        </Popup>               
                    </Marker> 
                ))} 

            </MapContainer> 

        </div> 
            
    )
}

/**
 * Sets custom icon to every camp spot on the map instead of default pin
 * @param {*} _iconSize 
 * @returns icon from local png in the given size
 */
function GetIcon(_iconSize) {
    return  L.icon({
            iconUrl: require("../images/Icons/tent_icon_for_map.png"),
            iconSize: [_iconSize],
        })
}

export {GetIcon} 