import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'

class NavBar extends React.Component {
    
    onClick = (e) => {
        localStorage.clear();
    }

    render() {
        if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            return(
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sito Progetto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/BnB">BnB</Nav.Link>
                        <Nav.Link href="/CasaVacanza">Casa Vacanza</Nav.Link>
                    </Nav>
                        <Nav.Link href="/PaginaCliente">Area personale</Nav.Link>
                        <Nav.Link href="/SecondaAutenticazioneAccedi" onClick = {this.onClick}>ESCI</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            );
        }
        if(localStorage.getItem('logged') && localStorage.getItem('proprietario')) {
            return(
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sito Progetto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/BnB">BnB</Nav.Link>
                        <Nav.Link href="/CasaVacanza">Casa Vacanza</Nav.Link>
                    </Nav>
                        <Nav.Link href="/PaginaProprietario">Area personale</Nav.Link>
                        <Nav.Link href="/SecondaAutenticazioneAccedi" onClick = {this.onClick}>ESCI</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            );
        }
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sito Progetto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/BnB">BnB</Nav.Link>
                        <Nav.Link href="/CasaVacanza">Casa Vacanza</Nav.Link>
                    </Nav>
                        <Nav.Link href="/secondaAutenticazioneAccedi">ACCEDI</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;