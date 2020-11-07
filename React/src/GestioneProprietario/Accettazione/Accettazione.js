import React from 'react'
import {ListGroup, Table, Button, ButtonGroup, Accordion, Card} from 'react-bootstrap'
import './Accettazione.css'

import { Redirect } from 'react-router-dom';

class Accettazione extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            apiResponse_accettazione: [],
            apiResponse_accettate: [],
            email_prop: localStorage.getItem('email'),
            error: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        const data = {
            ref_proprietario: this.state.email_prop
        };

        fetch('http://localhost:9000/getPrenotazioniAccettazione/prenotazioniAccettazione', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result) => {
            this.setState({ apiResponse_accettazione: JSON.parse(result) });
        
            if(this.state.apiResponse_accettazione.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse_accettazione.message });
            }
        });

        fetch('http://localhost:9000/getPrenotazioniAccettate/prenotazioniAccettate', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result) => {
            this.setState({ apiResponse_accettate: JSON.parse(result) });
        
            if(this.state.apiResponse_accettate.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse_accettate.message });
            }
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
        else if(this.state.error) {
            return <Redirect
                to={{
                    pathname: "/ErrorPage",
                    state: { 
                        error: true,
                        errorMessage: this.state.errorMessage 
                    }
                }}
            />
        }
        else {
            return(
                <div className="accettazione">
                    <div className="containerAccettazione">
                        <h1>Ecco le prenotazioni da accettare</h1>
                        <Accordion>
                            <div className="testa_accordo">
                                <p>ID</p>
                                <p>Cliente</p>
                                <p>Tempo rimanente</p>
                                <p>Struttura</p>
                                <p>Visualizza dettagli</p>
                            </div>
                            {
                                this.state.apiResponse_accettazione.map(((res) => 
                                    <div>
                                        <div className="testa_accordo">
                                            <p>{res.id_prenotazione}</p>&nbsp;
                                            <p>{res.ref_cliente}</p>&nbsp;
                                            <p>{Math.ceil((Math.abs(new Date(res.data_partenza) - Date.now()) / (1000 * 60 * 60 * 24)))} giorni</p>&nbsp;
                                            <p>{res.ref_proprieta}</p>&nbsp;
                                            <Accordion.Toggle as={Button} variant="link" eventKey={res.id_prenotazione}>visualizza dettagli</Accordion.Toggle>
                                        </div>
                                        <Accordion.Collapse eventKey={res.id_prenotazione}>
                                            <div className="corpo_accordo">
                                                <p>Numero soggiornanti: {res.num_soggiornanti}</p>    
                                                <p>Costo: {res.costo}</p>
                                                <p>Caparra: {res.caparra}</p>
                                                <p>Inizio soggiorno: {new Date(res.data_partenza).toLocaleDateString()}</p>
                                                <p>Fine soggiorno: {new Date(res.data_ritorno).toLocaleDateString()}</p>
                                            </div>                     
                                        </Accordion.Collapse>
                                    </div>
                                ))
                            }
                        </Accordion>
                    </div>
                    <div className="listaAccettazioni">
                        <h1>Ecco le prenotazioni accettate</h1>
                        <Table className="tabella">
                            <thead>
                                <tr>
                                    <th>ID </th>
                                    <th>Cliente</th>
                                    <th>Durata soggiorno</th>
                                    <th>Struttura</th>
                                </tr>
                            </thead>
                            {
                                this.state.apiResponse_accettate.map(((res) => 
                                    <div>
                                        <tbody>
                                            <tr>
                                                <th>{res.id_prenotazione}</th>
                                                <th>{res.ref_cliente}</th>
                                                <th>{Math.ceil((Math.abs(new Date(res.data_ritorno) - new Date(res.data_partenza))) / (1000 * 60 * 60 * 24))}</th>
                                                <th>{res.ref_proprieta}</th>
                                            </tr>
                                        </tbody>
                                    </div>
                                ))
                            }
                        </Table>
                    </div>
                </div>
            );
        }
    }
}


export default Accettazione;