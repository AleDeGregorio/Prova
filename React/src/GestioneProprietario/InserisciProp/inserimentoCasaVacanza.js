/*CSS FATTO*/

import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

import "./InserimentoProprietà.css";

import { Redirect } from 'react-router-dom';


class InserimentoCasaVacanza extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nome_proprieta: '',
      indirizzo: '',
      localita: '',
      provincia: '',
      tipo_proprieta: 'cv',
      servizi: '',
      descrizione: '',
      ref_proprietario: localStorage.getItem('email'),
      posti_letto:'',
      tariffa_casa: '',
      foto1SRC: '',
      foto1: null,
      fileName1: '',
      foto2SRC: '',
      foto2: null,
      fileName2: '',
      foto3SRC: '',
      foto3: null,
      fileName3: '',
      foto4SRC: '',
      foto4: null,
      fileName4: '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeFoto = (e) => {
    this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
    this.setState({ [e.target.id]: e.target.files[0] });
  }

  onSubmitInsert = (e) => {
    e.preventDefault();

    const data1 = {
      nome_proprieta: this.state.nome_proprieta,
      indirizzo: this.state.indirizzo,
      localita: this.state.localita,
      provincia: this.state.provincia,
      tipo_proprieta: 'cv',
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
        ref_proprieta_cv: this.state.apiResponse.insertId,
        posti_letto: this.state.posti_letto,
        tariffa_casa : this.state.tariffa_casa
      };

      this.setState({
        fileName1: data2.ref_proprieta_cv + "_1.jpg",
        fileName2: data2.ref_proprieta_cv + "_2.jpg",
        fileName3: data2.ref_proprieta_cv + "_3.jpg",
        fileName4: data2.ref_proprieta_cv + "_4.jpg",
      });

      fetch('http://localhost:9000/insertCasa/new',{
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
          var form = new FormData();
          form.append("foto1", this.state.foto1, this.state.fileName1);
          form.append("foto2", this.state.foto2, this.state.fileName2);
          form.append("foto3", this.state.foto3, this.state.fileName3);
          form.append("foto4", this.state.foto4, this.state.fileName4);
      
          fetch('http://localhost:9000/uploadFotoCV/upload', {
              method: "POST",
              body: form
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
          <p>La tua casa vacanza è stata registrata correttamente all'interno del sistema</p>
        </div>
      );
    }
    else {
      return (
        <div className = "background">
            <div className = "containerNew">  
                <div className = "contentNew">
                    <form onSubmit = {this.onSubmitInsert}>
                    <h2>Compila questo form per inserire la tua casa vacanza!</h2>
                    <label htmlFor = "nome_proprieta">Nome</label>
              <input
                type = "text"
                id = "nome_proprieta"
                name = "nome_proprieta"
                placeholder = "Nome casa vacanza"
                onChange = {this.onChange}
                className = "i"
                required
              />
  
              <label htmlFor = "localita">Città</label>
              <input
                type = "text"
                id = "localita"
                name = "localita"
                placeholder = "Città casa vacanza"
                onChange = {this.onChange}
                className = "i"
                required
              />
  
              <label htmlFor = "indirizzo">Indirizzo</label>
              <input
                type = "text"
                id = "indirizzo"
                name = "indirizzo"
                placeholder= "Indirizzo casa vacanza"
                onChange = {this.onChange}
                className = "i"
                required
              />
              
              <label htmlFor = "provincia">Provincia</label>
              <input
                type = "text"
                id = "provincia"
                name = "provincia"
                placeholder = "Provincia casa vacanza"
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
                placeholder = "Descrizione casa vacanza"
                onChange = {this.onChange}
                className = "i"
                required
              />
                    <label htmlFor = "tariffa_casa">Tariffa</label>
                    <input
                        type = "text"
                        pattern = "^\d+(.\d{1,2})?$"
                        title = "Inserire un valore numerico usando un punto per i valori decimali"
                        id = "tariffa_casa"
                        name = "tariffa_casa"
                        placeholder = "Tariffa casa vacanza"
                        onChange = {this.onChange}
                        className = "i"
                    />
                    <Form.Group controlId = "posti_Letto" id = 'posti_letto' name = 'posti_letto' >
                      <Form.Label>Posti Letto</Form.Label>
                      <Form.Control 
                        id = 'posti_letto'
                        name = 'posti_letto'
                        defaultValue = '1'
                        as = "select"   
                        onChange = {this.onChange}  
                        className = 'i'
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <label>Inserisci delle foto della tua struttura</label>
                        <Form.Row className = "justify-content-center">
                        <input
                        type = "file"
                        id = "foto1"
                        name = "foto1SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto1SRC} alt = "Foto 1" ></img>
                        <input
                        type = "file"
                        id = "foto2"
                        name = "foto2SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto2SRC} alt = "Foto 2" ></img>
                        <input
                        type = "file"
                        id = "foto3"
                        name = "foto3SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto3SRC} alt = "Foto 3" ></img>
                        <input
                        type = "file"
                        id = "foto4"
                        name = "foto4SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto4SRC} alt = "Foto 4" ></img>
                    </Form.Row>
                    </Form.Group>
                    <Link to="/InserimentoProprietà">Torna indietro</Link>
                    <Button variant="primary" type="submit">
                      Carica
                    </Button>
                    </form>
                </div>
            </div>
        </div>
      );}
    }
}

export default InserimentoCasaVacanza;