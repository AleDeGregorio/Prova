/*CSS COMPLETATO*/

import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './secondaAutenticazione.css'


function SecondaAutenticazioneRegistrati(){
    return(

        <Form className="contenitoreAutenticazione">
            <div className="contentNewCheckAutenticazione">
                <h2>Iscriviti</h2>
                
                <div>
                    <Button variant="primary" type="submit" className="pulsanti" href="/secondaAutenticazioneRegistratiCliente">
                        Cliente
                    </Button>
                    <Button variant="primary" type="submit" className="pulsanti" href="/secondaAutenticazioneRegistratiProprietario">
                        Proprietario
                    </Button>
                </div>
                <label>Sei già iscritto?<Link to="/secondaAutenticazioneAccedi"> ACCEDI</Link></label>
            </div>
        </Form>

    );
}
export default SecondaAutenticazioneRegistrati