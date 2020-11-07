import React from 'react'
import {Card, CardDeck, Form, Jumbotron, Button} from 'react-bootstrap'
import './DiventaHost.css'

function DiventaHost(){
        return(
            <div className="containerDH">
                <div className="top">
                <div className="containerFormDH">
                    
                    <h4>Inserisci i dati mancanti e inizia a registrare la tua prima struttura!</h4>
                        <Form>
                            <Form.Group controlId="formBasicDocument">
                                <Form.Label>Scegli tipo di documento</Form.Label>
                                <Form.Control as="select" placeholder="Scegli documento">
                                    <option></option>
                                    <option>Carta d'identità</option>
                                    <option>Tessera sanitaria</option>
                                    <option>Passaporto</option>
                                    <option>Patente</option>
                                </Form.Control>
                                <Form.Label>Inserisci foto documento</Form.Label>
                                <Form.File id="exampleFormControlFile1"/>
                            </Form.Group>
                        </Form>
                        <Button>Diventa un Host</Button>
                </div>
                <div className="jumbo">
                    <Jumbotron>
                    <h4>Pronto a diventare un Host?</h4>
                    <p>Noi ci prendiamo cura dei nostri  host, abbiamo tanti vantaggi per voi! </p>
                    <p>Vedi le strutture aggiunte da terzi</p>
                    <Button>Learn More</Button>
                    </Jumbotron>
                </div>
                </div>
                <div className="containerFormSV">
                    <h4>Scopri i vantaggi di essere un Host</h4>
                    <CardDeck>
                        <Card className="cdh">
                            <Card.Title>Inserisci e modifica le tue strutture</Card.Title>
                        </Card>
                        <Card className="cdh">
                        <Card.Title>Gestisci le prenotazioni</Card.Title>
                        </Card>
                        <Card className="cdh">
                            <Card.Title>Sarai sempre al corrente dei tuoi guadagni</Card.Title>
                        </Card>
                        <Card className="cdh">
                            <Card.Title>Comunicazione automatizzata</Card.Title>
                        </Card>
                    </CardDeck>
                </div>
            </div>

    );
}
export default DiventaHost;