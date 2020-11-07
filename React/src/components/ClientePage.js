//CSS COMPLETATO

import React from 'react';
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap'
import './ClientePage.css'

import { Redirect } from 'react-router-dom';

class Cliente extends React.Component{
    render() {
        if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            var nome = localStorage.getObj('user_data')[0].nome_cl;
            var cognome = localStorage.getObj('user_data')[0].cognome_cl;
            var data_nascita = new Date(localStorage.getObj('user_data')[0].data_nascita_cl).toLocaleDateString();
            var email = localStorage.getObj('user_data')[0].email_cl;
            var telefono = localStorage.getObj('user_data')[0].telefono_cl;
            return(
                <div className="PaginaCliente">
                    <h1>BENVENUTO {nome}!</h1>
                    <div className="contenitoreContainer">
                        <div className="containerDati">
                            <h3>DATI PERSONALI</h3>
                            <div className="Dati">
                                <ul>
                                    <li>
                                        Nome: {nome}
                                    </li>
                                    <li>
                                        Cognome: {cognome}
                                    </li>
                                    <li>
                                        Data di nascita: {data_nascita}
                                    </li>
                                    <li>
                                        E-mail: {email}
                                    </li>
                                    <li>
                                        Telefono: {telefono}
                                    </li>
                                </ul>
                            </div>
                            
                        <Button>Modifica dati</Button>
                        </div>
                    </div>
                </div>
            );
        }
        else{
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
    }
}
export default Cliente;

