import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './secondaAutenticazione.css'

import { Redirect } from 'react-router-dom';

class SecondaAutenticazioneRegistratiProprietario extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            nome: '',
            cognome: '',
            nascita: '',
            num_documento: '',
            telefono: '',
            apiResponse: [],
            error:false,
            errorMessage:'',
            success: false
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitInsert = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password,
            nome: this.state.nome,
            cognome: this.state.cognome,
            nascita: this.state.nascita,
            num_documento: this.state.num_documento,
            telefono: this.state.telefono
        }

        fetch('http://localhost:9000/insertProprietario/new', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });

            if(this.state.apiResponse.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                this.setState({ success: true })
            }
        });
    }

    render() {
        if(this.state.success) {
            return (
                <div className = 'Errore'>
                    <h1>Registrazione avvenuta con successo!</h1>
                    <p>Effettua pure il login, e comincia a navigare dove preferisci</p>
                </div>
            );
        }
        else if (this.state.error) {
            return <Redirect 
            to = {{
              pathname: "/ErrorPage",
              state: {
                error: true,
                errorMessage: this.state.errorMessage
              }
            }}
          />
        }
        else {
            return (
                <Form className="contenitoreAutenticazione" onSubmit={this.props.onSubmitInsert}>
                    <div className="contentNewCheckAutenticazione">
                        <h2>Iscriviti</h2>

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type = "name" 
                                placeholder = "Nome" 
                                id = 'nome'
                                name = 'nome'
                                onChange = {this.onChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSurname">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control 
                                type = "surname" 
                                placeholder = "Cognome" 
                                id = 'cognome'
                                name = 'cognome'
                                onChange = {this.onChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control 
                                type = "email" 
                                placeholder = "E-mail" 
                                id = 'email'
                                name = 'email'
                                onChange = {this.onChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type = "password" 
                                placeholder = "Password" 
                                id = 'password'
                                name = 'password'
                                onChange = {this.onChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridIndirizzo">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control 
                                type = "tel" 
                                placeholder = "Telefono" 
                                id = 'telefono'
                                name = 'telefono'
                                onChange = {this.onChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridIndirizzo">
                            <Form.Label>Numero documento</Form.Label>
                            <Form.Control 
                                type = "tel" 
                                placeholder = "Numero documento" 
                                id = 'num_documento'
                                name = 'num_documento'
                                onChange = {this.onChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCap">
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control 
                                type="date" 
                                required 
                                className="inputSignUp" 
                                onChange={this.onChange} 
                                id = 'nascita'
                                name = 'nascita'
                            />
                        </Form.Group>

                        <Link to="/secondaAutenticazioneRegistrati">Torna indietro</Link>
                    </div>
                
                    <Button variant="primary" className="pulsante" onClick = {this.onSubmitInsert}>
                        Registrati
                    </Button>
                </Form>
            );
        }
    }
}
export default SecondaAutenticazioneRegistratiProprietario