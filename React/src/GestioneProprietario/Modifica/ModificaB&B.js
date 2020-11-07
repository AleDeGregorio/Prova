/*CSS FATTO*/

import React from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"

import "../InserisciProp/InserimentoProprietà.css";

import { Redirect } from 'react-router-dom';

class ModificaBeB extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_bb: this.props.history.location.state ? this.props.history.location.state.dati_bb : '',
      ref_proprietario: localStorage.getItem('email'),
      id_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_bb.id_proprieta : '',
      nome_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_bb.nome_proprieta : '',
      indirizzo: this.props.history.location.state ? this.props.history.location.state.dati_bb.indirizzo : '',
      localita: this.props.history.location.state ? this.props.history.location.state.dati_bb.localita : '',
      provincia: this.props.history.location.state ? this.props.history.location.state.dati_bb.provincia : '',
      tipo_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_bb.tipo_proprieta : '',
      servizi: this.props.history.location.state ? this.props.history.location.state.dati_bb.servizi : '',
      descrizione: this.props.history.location.state ? this.props.history.location.state.dati_bb.descrizione : '',
      ref_proprieta_bb: this.props.history.location.state ? this.props.history.location.state.dati_bb.ref_proprieta_bb : '',
      check_in: this.props.history.location.state ? this.props.history.location.state.dati_bb.check_in : '',
      check_out: this.props.history.location.state ? this.props.history.location.state.dati_bb.check_out : '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    const data1 = {
      nome_proprieta: this.state.nome_proprieta,
      indirizzo: this.state.indirizzo,
      localita: this.state.localita,
      provincia: this.state.provincia,
      tipo_proprieta: this.state.tipo_proprieta,
      servizi: this.state.servizi,
      ref_proprietario: this.state.ref_proprietario,
      descrizione: this.state.descrizione,
      id_proprieta: this.state.id_proprieta
    };

    fetch('http://localhost:9000/updateProprieta/fields', {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify(data1)
    })
    .then((result) => {result.text()})
    .then((result) => {
      this.setState({ apiResponse: result });

      if(this.state.apiResponse && this.state.apiResponse.status === 'error') {
        this.setState({
          error: true,
          errorMessage: this.state.apiResponse.message
        });
      }
      else {
        const data2 = {
          check_in: this.state.check_in,
          check_out: this.state.check_out,
          ref_proprieta_bb: this.state.ref_proprieta_bb,
        };
    
        fetch('http://localhost:9000/updateBB/fields',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data2)
        })
        .then((result) => result.text())
        .then((result) => {
          this.setState({ apiResponse: result });
    
          if(this.state.apiResponse && this.state.apiResponse.status === 'error') {
            this.setState({
              error: true,
              errorMessage: this.state.apiResponse.message
            });
          }
          else {
            this.setState({ success: true });
          }
        });
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
        to = {{
          pathname: "/ErrorPage",
          state: {
            error: true,
            errorMessage: this.state.errorMessage
          }
        }}
      />
    }
    else if(this.state.success) {
      return (
        <div className = "Errore">
          <h1>Modifiche avvenute con successo!</h1>
          <p>Il tuo B&B è stato modificato correttamente all'interno del sistema</p>
        </div>
      );
    }
    else {
      var bb = this.state.dati_bb ? this.state.dati_bb : '';

      return (
          <div className="background">
        <div className="containerNew">  
          <div className="contentNew">
            <form>
            <h2>Modifica il tuo B&B con le informazioni che preferisci!</h2>
              <label htmlFor = "nome_proprieta">Nome</label>
                <input
                  type = "text"
                  id = "nome_proprieta"
                  name = "nome_proprieta"
                  defaultValue = {bb.nome_proprieta}
                  onChange = {this.onChange}
                  className = "i"
                />
                <label htmlFor = "localita">Città</label>
                <input
                  type = "text"
                  id = "localita"
                  name = "localita"
                  defaultValue = {bb.localita}
                  onChange = {this.onChange}
                  className = "i"
                />

                <label htmlFor = "indirizzo">Indirizzo</label>
                <input
                  type = "text"
                  id = "indirizzo"
                  name = "indirizzo"
                  defaultValue = {bb.indirizzo}
                  onChange = {this.onChange}
                  className = "i"
                />
                
                <label htmlFor = "provincia">Provincia</label>
                <input
                  type = "text"
                  id = "provincia"
                  name = "provincia"
                  defaultValue = {bb.provincia}
                  onChange = {this.onChange}
                  className = "i"
                />

                <label htmlFor = "servizi">Servizi</label>
                <input
                  type = "text"
                  id = "servizi"
                  name = "servizi"
                  defaultValue = {bb.servizi}
                  onChange = {this.onChange}
                  className = "i"
                />
                <label htmlFor = "descrizione">Descrizione</label>
                <textarea 
                  id = 'descrizione'
                  name = 'descrizione'
                  defaultValue = {bb.descrizione}
                  onChange = {this.onChange}
                  className = 'iTA'
                >
                </textarea>

                <label htmlFor = "check_in">Check-in</label>
                <input
                  type = "text"
                  pattern = "^([0-9]|1[0-9]|2[0-3]).[0-5][0-9]$"
                  title = "Inserire un orario corretto, usando un punto per separare i minuti"
                  id = "check_in"
                  name = "check_in"
                  defaultValue = {bb.check_in + '0'}
                  onChange = {this.onChange}
                  className = "i"
                />

                <label htmlFor = "check_out">Check-out</label>
                <input
                  type = "text"
                  pattern = "^([0-9]|1[0-9]|2[0-3]).[0-5][0-9]$"
                  title = "Inserire un orario corretto, usando un punto per separare i minuti"
                  id = "check_out"
                  name = "check_out"
                  defaultValue = {bb.check_out + '0'}
                  onChange = {this.onChange}
                  className = "i"
                />
              
                <Button variant="primary" onClick = {this.onSubmit}>
                Carica
              </Button>
            </form>
          </div>
        </div>
        </div>
      );
    }
  }
}

export default ModificaBeB;