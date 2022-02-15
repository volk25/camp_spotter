import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MapPage from "./pages/MapPage";
import CampDetailsPage from "./pages/CampDetailsPage";
import AddCampPage from "./pages/AddCampPage";
import Navbar from "./components/Navbar";

export default function App() {

	return (

		<Router>
			<div className="App background">
				<div className='position-relative'>
					<Navbar/>
				</div>
				<Routes>
					<Route exact path="/" element={<HomePage/>} />
					<Route exact path="/login" element={<LoginPage/>}/>
					<Route exact path="/signup" element={<SignupPage/>}/>
					<Route exact path="/contact" element={<ContactPage/>}/>
					<Route exact path="/map" element={<MapPage/>}/>
					<Route  path="/camps/:slug" element={<CampDetailsPage/>}/>
					<Route exact path="/camps/add" element={<AddCampPage/>}/>
				</Routes>
      		</div>
    	</Router>
  	);
};

