import React from "react";
import TokenClear from './TokenClear';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

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

			{/* Put everything inside a container */}
  			<Container>

				{/* Create a navbar brand and the logo */}
    			<Navbar.Brand href="/">
            		<h1 className="navbar-logo">Campspotter<i className="fas fa-campground"></i></h1>
          		</Navbar.Brand>

				{/* Create a button for toggling the dropdown menu (for menu entries on the right in md) */}
    			<Navbar.Toggle aria-controls="basic-navbar-nav" />
    				<Navbar.Collapse id="basic-navbar-nav">
      					<Nav className="ms-auto">

						  	{/* Create the menu entries to be aligned on the right */}
        					<Nav.Link className="text-white h5" href={ token ? "/camps/add" : "/login" }>Add Camp</Nav.Link>
        					<Nav.Link className="text-white h5" href="/contact">About Us</Nav.Link>

							{/* Restrict the Login and Signup to be shown only without token */}
							{ !token ?
								<Nav>
									<Nav.Link className="text-white h5" href="/login">Login</Nav.Link>
									<Nav.Link className="text-white h5" href="/signup">Signup</Nav.Link>
								</Nav>
							:
								<></>
							}
							
							{/* Restrict the Profile dropdown menu to be shown only with token */}
							{ token ?
								<Nav>
									<NavDropdown className="h5" title={<i class="fas fa-user-circle h4 text-white"></i>} id="basic-nav-dropdown">
										<NavDropdown.Item className="h6" href="/my-profile">MyProfile</NavDropdown.Item>
										<NavDropdown.Item className="h6" href="/my-camps">MyCamps</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item className="h6" href="" onClick = {TokenClear}>LogOut</NavDropdown.Item>
									</NavDropdown>			
								</Nav>
							:
								<></>
							}
	
      					</Nav>
    				</Navbar.Collapse>

  			</Container>

		</Navbar>

	)
};