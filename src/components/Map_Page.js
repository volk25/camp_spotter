import React, {Component} from 'react' ;
import L from 'leaflet';
import { MapContainer, useMap,TileLayer, Marker, Popup} from 'react-leaflet';
import { GeoSearchControl, AlgoliaProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';

import campingsList from './campingsList.json' ;


function MyMap() {
    const position = [52.3676, 4.9041] //position of Amsterdam at which map will always open
    const prov = new AlgoliaProvider();

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
            {campingsList.map((camping) => (
                <Marker position={camping.position} icon={GetIcon(50)}>
                <Popup>
                    {camping.name}
                </Popup>

            </Marker> ))} 
        </MapContainer>      
    )
}


// Sets custom icon to every camp spot on the map instead of default pin
function GetIcon(_iconSize) {
    return  L.icon({
            iconUrl: require("../Static/Icons/tent_icon_for_map.png"),
            iconSize: [_iconSize]
        })
}

// Here SearchControl element is being created which is inputed in the function as a tag
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


export default MyMap
