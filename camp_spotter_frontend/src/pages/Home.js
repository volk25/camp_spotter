import React from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="background">
      {/* <p>home</p> */}
      <SearchBar />
      <div style={{ height: "100vh" }}> </div>
    </div>
  );
};

export default Home;