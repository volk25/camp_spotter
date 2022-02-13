import React from "react";
import MyMap from "../components/Map"

/**
 * Render the map page with all the camps. 
 * @returns renders the page
 */
const MapPage = () => {
  return (
    <div className="bg-success">
      <MyMap/>
    </div>
  );
}

export default MapPage;
