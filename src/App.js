import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Settings from "./pages/Settings/Settings";
import Navbar from "./components/Navbar/Navbar";
import MyMap from "./pages/MapPage/MapPage";
import CampDetails from "./pages/CampDetails/CampDetails";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/map" element={<MyMap />} />
          <Route  path="/camps/:camp_id" element={<CampDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
