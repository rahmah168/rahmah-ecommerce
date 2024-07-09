import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar  data-bs-theme="dark" expand="lg" className="fixed-top" style={{ backgroundColor: 'black' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/logo.png"  // Updated path for the public folder
            style={{ width: 'auto', height: '60px', padding: '5px' }}
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{display: "flex", gap: "15px"}}>
            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin" className="text-white">Admin</Nav.Link>
            <Nav.Link as={Link} to="/product" className="text-white">Product</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">About Us</Nav.Link>
          </Nav>
          <div className="text-end">
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/register" className="btn btn-warning">Sign-up</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
