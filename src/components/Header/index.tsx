import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
        <Nav.Link as={Link} to="/tasks" className="nav-link">Atividades</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;