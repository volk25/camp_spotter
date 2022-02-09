import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import MapPage from "./pages/MapPage/MapPage";
import CampDetails from "./pages/CampDetails/CampDetails";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/map" element={<MapPage />} />
          <Route  path="/camps/:slug" element={<CampDetails/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
