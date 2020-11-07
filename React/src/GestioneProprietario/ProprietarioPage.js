import React, {useState} from 'react';
import {Nav, Card, CardColumns, Modal, Button} from 'react-bootstrap'
import './ProprietarioPage.css'
import {SiCashapp} from "react-icons/si";
import {RiAccountBoxLine} from "react-icons/ri";
import {Link} from 'react-router-dom'

import { Redirect } from "react-router-dom";


class ProprietarioPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: localStorage.getItem('email'),
            apiResponse: [],
            error: false,
            errorMessage: '',
            show: false
        }
    }
    componentDidMount() {
        const data = {
            email: this.state.email
        };

        fetch('http://localhost:9000/getDataInvio/dataInvio',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result)=>result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });

            if(this.state.apiResponse.status === 'error') {
                this.setState({
                    error: true,
                    errorMessage: this.state.apiResponse.message
                });
            }
        })
    }


    handleClose = () => {
        this.setState({
            show: false
        });
    }
    
    handleShow = () => {
        this.setState({
            show: true
        });
    }

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
            var data_invio = this.state.apiResponse[0] ? new Date(this.state.apiResponse[0].ultimo_invio_dati).toLocaleDateString() : "Mai inviati";
            return(
                <div className="carte_prop" >
                <Link to="/Accettazione" className="LinK">
                <Card className="prop">
                    <Card.Title>Accetta Prenotazioni</Card.Title>
                    <Card.Text>Visualizza le prenotazioni in attesa di essere accettate.</Card.Text>
                </Card>
                </Link>
                <Link to = "/Checkin" className="LinK">
                    <Card className="prop">
                    <Card.Img src="https://cdn.onlinewebfonts.com/svg/img_572848.png" className="image"></Card.Img>
                    <Card.Body>
                    <Card.Title>Check-in</Card.Title>
                    <Card.Text>Effettua il check-in dei soggiornanti e invia i dati all'ufficio della Questura.</Card.Text>
                    </Card.Body>
                   </Card>
                </Link>
                <Card className="prop" onClick = {this.handleShow}>
                    <Card.Title>Invio dati Turismo </Card.Title>
                    <Card.Text>Effettua l'invio dei dati relativi ai soggiornanti all'ufficio del Turismo.</Card.Text>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invio dati all'ufficio del turismo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <div className="turismocont">
                           <p>Ultimo invio dei dati all'ufficio competente: {data_invio} </p>
                           <p>Desideri inviare i dati nuovamente?</p>
                       </div>
                    </Modal.Body>
                    <Modal.Footer>
                     <Button variant="secondary" /*funzione invia dationClick={}*/>Invia dati</Button>
                     <Button variant="secondary" onClick={this.handleClose}>
                      Chiudi
                    </Button>                    
                   </Modal.Footer>
                </Modal>
                
                <Link to ="/InserimentoProprietà" className="LinK">
                <Card className="prop">
                    <Card.Img src="https://cdn3.iconfinder.com/data/icons/hotels-b-b-and-cabins-1/50/Hotels_BB_and_Cabins_Outline-74-512.png" className="image"></Card.Img>
                    <Card.Title>Inserisci Proprietà</Card.Title>
                    <Card.Text>Scegli tra le tipologie di strutture presenti nel sistema e inserisci la tua! </Card.Text>
                </Card>
                </Link>
                <Link to="/SceltaModifica" className="LinK">
                <Card  className="prop">
                    <Card.Title>Modifica Proprietà</Card.Title>
                    <Card.Text>Scegli tra le strutture possedute ed effettua i cambiamenti che preferisci.</Card.Text>
                </Card></Link>
                <Card className="prop">
                    <RiAccountBoxLine className="image"></RiAccountBoxLine>
                    <Card.Title>Gestione Account</Card.Title>
                    <Card.Text>Vedi le opzioni disponibili</Card.Text>
                </Card>
                <Link to="/Earning" className="LinK">
                <Card className="prop">
                  <SiCashapp className="image"></SiCashapp>
                    <Card.Title>Resoconto Guadagni</Card.Title>
                    <Card.Text>Visualizza </Card.Text>
                </Card>
                </Link>
                </div>
            );
        }
    }
}

export default ProprietarioPage;