/*CSS FATTO*/ 

import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

import "./InserimentoProprietà.css";

import { Redirect } from 'react-router-dom';

class InserimentoBnB extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nome_proprieta: '',
      indirizzo: '',
      localita: '',
      provincia: '',
      tipo_proprieta: 'bb',
      servizi: '',
      descrizione: '',
      ref_proprietario: localStorage.getItem('email'),
      check_in: '',
      check_out: '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitInsert = (e) => {
    e.preventDefault();

    const data1 = {
      nome_proprieta: this.state.nome_proprieta,
      indirizzo: this.state.indirizzo,
      localita: this.state.localita,
      provincia: this.state.provincia,
      tipo_proprieta: 'bb',
      servizi: this.state.servizi,
      ref_proprietario: this.state.ref_proprietario,
      descrizione: this.state.descrizione
    }

    fetch('http://localhost:9000/insertProprieta/new', {
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data1)
    })
    .then((result) => result.text())
    .then((result) => {
      this.setState({ apiResponse: JSON.parse(result) });

      if(this.state.apiResponse.status === 'error') {
        this.setState({ error: true });
        this.setState({ errorMessage: this.state.apiResponse.message });
      }

      const data2 = {
        ref_proprieta_bb: this.state.apiResponse.insertId,
        check_in: this.state.check_in,
        check_out : this.state.check_out
      };

      fetch('http://localhost:9000/insertBB/new',{
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data2)
      })
      .then((result) => result.text())
      .then((result) => {
        this.setState({ apiResponse: result });

        if(this.state.apiResponse.status === 'error') {
          this.setState({ error: true });
          this.setState({ errorMessage: this.state.apiResponse.message });
        }
        else { 
          this.setState({ success: true });
        }
      });
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
          <h1>Inserimento avvenuto con successo!</h1>
          <p>Il tuo B&B è stato registrato correttamente all'interno del sistema</p>
        </div>
      );
    }
    else {
      return(
        <div className = "background">
        <div className = "containerNew">  
            <div className = "contentNew">
                <form onSubmit = {this.onSubmitInsert}>
                <h2>Compila questo form per inserire il tuo B&B!</h2>
            
                <label htmlFor = "nome_proprieta">Nome</label>
                <input
                  type = "text"
                  id = "nome_proprieta"
                  name = "nome_proprieta"
                  placeholder = "Nome B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
  
                <label htmlFor = "localita">Città</label>
                <input
                  type = "text"
                  id = "localita"
                  name = "localita"
                  placeholder = "Città B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
  
                <label htmlFor = "indirizzo">Indirizzo</label>
                <input
                  type = "text"
                  id = "indirizzo"
                  name = "indirizzo"
                  placeholder= "Indirizzo B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
             
                <label htmlFor = "provincia">Provincia</label>
                <input
                  type = "text"
                  id = "provincia"
                  name = "provincia"
                  placeholder = "Provincia B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
  
                <label htmlFor = "servizi">Servizi</label>
                <input
                  type = "text"
                  id = "servizi"
                  name = "servizi"
                  title = "Separare ogni servizio elencato con una virgola"
                  placeholder = "Elenco servizi offerti"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
                  <label htmlFor = "descrizione">Descrizione</label>
                  <input
                  type = "text"
                  id = "descrizione"
                  name = "descrizione"
                  placeholder = "Descrizione B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
  
            <label htmlFor="check_in">Check-in</label>
            <input
              type = "text"
              pattern = "^([0-9]|1[0-9]|2[0-3]).[0-5][0-9]$"
              title = "Inserire un orario corretto, usando un punto per separare i minuti"
              id = "check_in"
              name = "check_in"
              placeholder = "Orario check-in"
              className = "i"
              onChange = {this.onChange}
            />
  
            <label htmlFor="check_out">Check-out</label>
            <input
              type = "text"
              pattern = "^([0-9]|1[0-9]|2[0-3]).[0-5][0-9]$"
              title = "Inserire un orario corretto, usando un punto per separare i minuti"
              id = "check_out"
              name = "check_out"
              placeholder = "Orario check-out"
              className = "i"
              onChange = {this.onChange}
            />
            <Link to="/InserimentoProprietà">Torna indietro</Link>
            <Button variant="primary" type="submit">
              Carica
            </Button>
          </form>
        </div>
      </div>
      </div>
       ); }
    }
};

export default InserimentoBnB;