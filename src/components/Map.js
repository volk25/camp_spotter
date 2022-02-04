import React, {useEffect, useState} from 'react' ;
import L from 'leaflet';
import { MapContainer, useMap,TileLayer, Marker, Popup} from 'react-leaflet';
import { GeoSearchControl, AlgoliaProvider } from 'leaflet-geosearch';
import { Link } from "react-router-dom";


/**
 * Create a map, include search bar on it, load all camping spots from json and mark them with customized tent icon. 
 * @returns map with camp spots displayed on it 
 */
function MyMap(props) {
    const position = [52.3676, 4.9041] //position of Amsterdam at which map will always open
    const prov = new AlgoliaProvider();

    //Setting a state for camps, data loading  and errors
    const [result, setCamps] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect ( () => {
        fetch ('http://localhost:3000/campingsList.json')
        .then (resp => resp.json())
        .then (
            (result) => {
            setCamps(result);
        })
        .catch((err) => {
            setError(err);
            console.log(err)
        })
        .finally(() => {
            setLoading(false);
            });    
    },[]); 
    //in case data will be fetched slowly, "data loading" will appear on the screen.
    if (loading) {
        return <p>Data is loading...</p>;
        }
    //if json doesn't have an array, this error will be displayed on the screen. For map function to work, json has to be an array
    if (error || !Array.isArray(result)) {
    return <p>There was an error loading your data!</p>;
    }
    // if everything went well, display our page

    return (
       
       //adding the map and making it fit 100% of the page

        <MapContainer className="map" center={position} zoom={10} style={{height:"100vh", width: "100%"}}> 
        
         <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
            contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>  
  

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
        {/* adding markers to the map. Data are taken from campingsList.json*/}
        {result.map((camping) => (
            <Marker position={[camping.latitude, camping.longitude]} icon={GetIcon(50)} key={camping.slug}>
                <Popup>
                    <Link to ={'/camps/' + camping.slug}>
                    <span>
                        {camping.name}                       
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