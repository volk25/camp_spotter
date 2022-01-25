import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

const Home = () => {
  return (
    <div className="background">
      {/* <p>home</p> */}
      <Navbar />
      <SearchBar />
      <div style={{ height: "100vh" }}> </div>
    </div>
  );
};

export default Home;
