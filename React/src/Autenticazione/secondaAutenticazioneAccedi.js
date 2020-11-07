/*CSS COMPLETATO*/

import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './secondaAutenticazione.css'

import { Redirect } from 'react-router-dom';

class SecondaAutenticazioneAccedi extends React.Component {

    render() {
        if(this.props.error && this.props.errorMessage !== '') {
            return <Redirect
                      to={{
                          pathname: "/ErrorPage",
                          state: { 
                            error: this.props.error,
                            errorMessage: this.props.errorMessage
                          }
                      }}
                  />
        }
        else if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            return <Redirect to = "/PaginaCliente" />
        }
        else if(localStorage.getItem('logged') && localStorage.getItem('proprietario')) {
            return <Redirect to = "/PaginaProprietario" />
        }
        else {
            return(
                <div className="accedi">
                    <Form className="contenitoreAutenticazione" onSubmit = {this.props.onSubmitLogin}>
                        <h2>Accedi</h2>
                           <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Control type="email" name = "email" placeholder="E-mail" onChange = {this.props.onChange} required />
                            </Form.Group>
                
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Control type="password" name = "password" placeholder="Password" onChange = {this.props.onChange} required/>
                            </Form.Group>
                            <label>Non sei iscritto?<Link to="/secondaAutenticazioneRegistrati"> REGISTRATI</Link></label>
                        <Button variant="primary" type="submit" className="pulsante">
                            Accedi
                        </Button>
                    </Form>
                </div>
            );
        }
    }
}

export default SecondaAutenticazioneAccedi