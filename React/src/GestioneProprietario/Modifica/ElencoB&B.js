import React, { Component } from 'react'

import ListBeB from './ListB&B'
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


class  ElencoBeB extends Component {
    
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
             
              <ListBeB />
             
            </>
        );
    }
  }
}

export default ElencoBeB;






























/* elenco dei B&B da importare
import React from "react";
import Card from 'react-bootstrap/Card'
import './ElencoProprietà.css';
import {Link} from 'react-router-dom'

function ElencoBeb(){
    return(
        <div className="row">
            <div className="col">
                <div className="row">
                <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                    <Link to="/SceltaModificaB&B" className="LinK">
                    <Card className="CardProprietà">
                        <img src="https://cf.bstatic.com/images/hotel/max1024x768/191/191375610.jpg" className="immagineRisultati"/>
                        <Card.Title className="CardTitolo">asada</Card.Title>
                        <Card.Text>asdasdas</Card.Text>
                    </Card> </Link>
                </div>
            </div>
            
        </div>
    );
}
export default ElencoBeb;*/