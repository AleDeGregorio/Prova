import React from 'react';  
import {Button} from 'react-bootstrap';  
import './Checkin.css'

class CheckinEffettuato extends React.Component {
    render() {
        return (
            <div className = "Autenticazione">
                <h1>Check-in effettuato con successo!</h1>
                <p>I dati inseriti sono stati correttamente inviati alla questura.</p>
                <Button>Torna indietro</Button>
            </div>
        );
    }
}

export default CheckinEffettuato;