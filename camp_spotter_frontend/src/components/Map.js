import React, {useEffect, useState} from 'react' ;
import L from 'leaflet';
import { MapContainer, useMap, TileLayer, Marker, Popup} from 'react-leaflet';
import { GeoSearchControl, AlgoliaProvider } from 'leaflet-geosearch';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import LocationMarker from "./Geolocation.js"

/**
 * Create a map, include search bar on it, load all camping spots from json and mark them with customized tent icon. 
 * @returns map with camp spots displayed on it 
 */
function MyMap(props) {

    // Define the variables/constants/states
    const position = [52.3676, 4.9041] //position of Amsterdam at which map will always open
    const prov = new AlgoliaProvider();
    const [campList, setCampList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    // Define what to do when the page is loaded
    useEffect (() => {

        // Fetch the data from the API (keep in mind that the current requesting address should be authorized in the API)
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
        
        // Catch the error if present and set it to the error variable
        .catch((err) => setError(err))

        // Set to false the loading variable
        .finally(() => setLoading(false));

    },[]);

    // If loading variable is still set to true, notify it to the user
    if (loading) {
        return <p>Data is loading...</p>;
        }
    //if json doesn't have an array, this error will be displayed on the screen. For map function to work, json has to be an array
    if (error || !Array.isArray(campList)) {
    return <p>There was an error loading your data!</p>;
    }

    // If data is loaded and there are no errors, show the map page
    return (
       
        //adding the map and making it fit 100% of the page

        <MapContainer className="map" center={position} zoom={10} style={{height:"100vh", width: "100%"}}> 
        
         <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
            contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
  
        <LocationMarker/>
        <SearchControl 
                provider={prov}
                style={'bar'}
                showMarker={true}
                showPopup={false}
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
            <Marker position={[camp.latitude, camp.longitude]} icon={GetIcon(50)} key={camp.slug}>
                <Popup>
                    <Link to ={'/camps/' + camp.slug}>
                    <span>
                        {camp.title}                       
                    </span>  
                    </Link> 
                </Popup>               
            </Marker> ))} 
        </MapContainer>  
            
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
            iconSize: [_iconSize]
        })
}


/**
 * Here SearchControl element is being created which is inputed in the function as a tag
 * @param {*} props 
 * @returns nothing
 */
const SearchControl = (props) => {
    const map = useMap();
  
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: props.provider,
        ...props
      });
  
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map, props]);
  
    return null;
  };


export default MyMap;
export  {GetIcon} 