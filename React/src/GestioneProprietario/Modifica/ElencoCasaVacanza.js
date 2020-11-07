import React, { Component } from 'react'

import ListCase from './ListCase'
import styled, { createGlobalStyle } from 'styled-components'

import { Redirect } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Montserrat";
    src: url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  }
  * {
    margin: 0;
	  padding: 0;
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
  }
  body {
    background-color: #f5f5f5;
  }
`


class  ElencoCasaVacanza extends Component {
  render() {
    if(!localStorage.getItem('logged') || !localStorage.getItem('proprietario')) {
        return <Redirect
            to={{
                pathname: "/ErrorPage",
                state: { 
                    error: true,
                    errorMessage: "Utente non autorizzato" 
                }
            }}
        />
    }
    else {
        return (
            <>
              <GlobalStyle />
             
              <ListCase />
             
            </>
          )
    }
  }
}

export default ElencoCasaVacanza;

/* file vecchio 
import React from "react";
import Card from 'react-bootstrap/Card'
import './ElencoProprietà.css';
import {Link} from 'react-router-dom'

function ElencoCasaVacanza(){
    return(
        <div className="row">
            <div className="col">
                <div className="row">
                <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card>
                    </Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                    <Link to="/ModificaCasaVacanza" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card></Link>
                </div>
            </div>
            
        </div>
    );
}
export default ElencoCasaVacanza; */ 