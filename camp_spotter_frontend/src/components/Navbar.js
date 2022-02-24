import React from "react";
import TokenClear from './TokenClear';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import "../App.css";

/**
 * Renders the navbar.
 * @returns the navbar component
 */
export default function NavBar() {

	// Define the parameters coming from outside the component
	const token = localStorage.getItem('token')

	// Render the component
	return(

		<Navbar bg="" expand="lg">

            {/* Create a navbar brand and the logo */}
            <Navbar.Brand className="mx-5" href="/">
                <h1 className="navbar-logo">Campspotter<i className="fas fa-campground"/></h1>
            </Navbar.Brand>

            {/* Create a button for toggling the dropdown menu (for menu entries on the right in md) */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-5">

                    {/* Create the menu entries to be aligned on the right */}
                    <Nav.Link className="text-white  text-center  mt-2 h5" href="/map/localize">Map</Nav.Link>
                    <Nav.Link className="text-white  text-center  mt-2 h5" href={ token ? "/camps/add" : "/login" }>Add Camp</Nav.Link>
                    <Nav.Link className="text-white  text-center mt-2 h5" href="/contact">About Us</Nav.Link>

                    {/* Restrict the Login and Signup to be shown only without token */}
                    { !token ?
                        <Nav>
                            <Nav.Link className="text-white  mt-2 h5" href="/login">Login</Nav.Link>
                            <Nav.Link className="text-white mt-2 h5" href="/signup">Signup</Nav.Link>
                        </Nav>
                    :
                        <></>
                    }

                    {/* Restrict the Profile dropdown menu to be shown only with token */}
                    { token ?
                        <Nav>
                            <NavDropdown style={{width:'4vw'}} className="text-center me-3 h5" title={<i class="  mt-2 fas fa-user-circle h4 text-white"/>} id="basic-nav-dropdown">
                                <NavDropdown.Item className="text-center text-white h6" href="/myprofile">MyProfile</NavDropdown.Item>
                                <NavDropdown.Item className="text-center text-white h6" href="/mycamps">MyCamps</NavDropdown.Item>
                                <NavDropdown.Divider className="text-white h6" />
                                <NavDropdown.Item className="text-center text-white h6" href="" onClick = {TokenClear}>LogOut</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    :
                        <></>
                    }

                </Nav>
            </Navbar.Collapse>

        </Navbar>

	)
};