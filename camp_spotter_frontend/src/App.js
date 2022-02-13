import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage";
import CampDetails from "./pages/CampDetails";
import AddCamp from "./pages/AddCamp";
import Navbar from "./components/Navbar/Navbar";



function App() {
  return (
    <Router>
      <div className="App background">
      <div className='position-relative'><Navbar/></div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/map" element={<MapPage/>}/>
          <Route  path="/camps/:slug" element={<CampDetails/>}/>
          <Route exact path="/camps/add" element={<AddCamp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
