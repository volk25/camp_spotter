import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MapPage from "./pages/MapPage/MapPage";
import CampDetails from "./pages/CampDetails/CampDetails";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/map" element={<MapPage/>}/>
          <Route  path="/camps/:slug" element={<CampDetails/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
