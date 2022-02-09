import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import MyMap from "../../components/Map"

/**
 * Render the map page with all the camps. 
 * @returns renders the page
 */
const MapPage = () => {
  return (
    <div className="bg-success">
      <Navbar/>
      <MyMap/>
    </div>
  );
}

export default MapPage;
