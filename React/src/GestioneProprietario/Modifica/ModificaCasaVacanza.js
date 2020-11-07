/*CSS FATTO*/

import React from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"
import '../InserisciProp/InserimentoProprietà.css'

import { Redirect } from 'react-router-dom';

class ModificaCasaVacanza extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_casa: this.props.history.location.state ? this.props.history.location.state.dati_casa : '',
      ref_proprietario: localStorage.getItem('email'),
      id_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_casa.id_proprieta : '',
      nome_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_casa.nome_proprieta : '',
      indirizzo: this.props.history.location.state ? this.props.history.location.state.dati_casa.indirizzo : '',
      localita: this.props.history.location.state ? this.props.history.location.state.dati_casa.localita : '',
      provincia: this.props.history.location.state ? this.props.history.location.state.dati_casa.provincia : '',
      tipo_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_casa.tipo_proprieta : '',
      servizi: this.props.history.location.state ? this.props.history.location.state.dati_casa.servizi : '',
      descrizione: this.props.history.location.state ? this.props.history.location.state.dati_casa.descrizione : '',
      ref_proprieta_cv: this.props.history.location.state ? this.props.history.location.state.dati_casa.ref_proprieta_cv : '',
      posti_letto: this.props.history.location.state ? this.props.history.location.state.dati_casa.posti_letto : '',
      tariffa_casa: this.props.history.location.state ? this.props.history.location.state.dati_casa.tariffa_casa : '',
      imgCV_path1SRC: this.props.history.location.state ? this.props.history.location.state.dati_casa.imgCV_path1 : '',
      imgCV_path2SRC: this.props.history.location.state ? this.props.history.location.state.dati_casa.imgCV_path2 : '',
      imgCV_path3SRC: this.props.history.location.state ? this.props.history.location.state.dati_casa.imgCV_path3 : '',
      imgCV_path4SRC: this.props.history.location.state ? this.props.history.location.state.dati_casa.imgCV_path4 : '',
      imgCV_path1: null,
      filename1: '',
      imgCV_path2: null,
      filename2: '',
      imgCV_path3: null,
      filename3: '',
      imgCV_path4: null,
      filename4: '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeImg = (e) => {
    this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) });
    this.setState({ [e.target.id]: e.target.files[0] });
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
          posti_letto: this.state.posti_letto,
          tariffa_casa: this.state.tariffa_casa,
          ref_proprieta_cv: this.state.ref_proprieta_cv,
        };

        this.setState({
          fileName1: data2.ref_proprieta_cv + "_1.jpg",
          fileName2: data2.ref_proprieta_cv + "_2.jpg",
          fileName3: data2.ref_proprieta_cv + "_3.jpg",
          fileName4: data2.ref_proprieta_cv + "_4.jpg",
        });
    
        fetch('http://localhost:9000/updateCasa/fields',{
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
            var form = new FormData();
            if(this.state.imgCV_path1) {
              form.append("foto1", this.state.imgCV_path1, this.state.fileName1);
            }
            if(this.state.imgCV_path2) {
              form.append("foto2", this.state.imgCV_path2, this.state.fileName2);
            }
            if(this.state.imgCV_path3) {
              form.append("foto3", this.state.imgCV_path3, this.state.fileName3);
            }
            if(this.state.imgCV_path4) {
              form.append("foto4", this.state.imgCV_path4, this.state.fileName4);
            }

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
          <p>La tua casa vacanza è stata modificata correttamente all'interno del sistema</p>
        </div>
      );
    }
    else {
      var casa = this.state.dati_casa;

      return (
          <div className="background">
        <div className="containerNew"> 
          <div className="contentNew">
            <form>
            <h2>Modifica la tua casa vacanza con le informazioni che preferisci!</h2>
              <label htmlFor = "nome_proprieta">Nome</label>
              <input
                type = "text"
                id = "nome_proprieta"
                name = "nome_proprieta"
                defaultValue = {casa.nome_proprieta}
                onChange = {this.onChange}
                className = "i"
              />
              <label htmlFor = "localita">Città</label>
              <input
                type = "text"
                id = "localita"
                name = "localita"
                defaultValue = {casa.localita}
                onChange = {this.onChange}
                className = "i"
              />
              <label htmlFor = "indirizzo">Indirizzo</label>
              <input
                type = "text"
                id = "indirizzo"
                name = "indirizzo"
                defaultValue = {casa.indirizzo}
                onChange = {this.onChange}
                className = "i"
              />
              
              <label htmlFor = "provincia">Provincia</label>
              <input
                type = "text"
                id = "provincia"
                name = "provincia"
                defaultValue = {casa.provincia}
                onChange = {this.onChange}
                className = "i"
              />

              <label htmlFor = "servizi">Servizi</label>
              <input
                type = "text"
                id = "servizi"
                name = "servizi"
                defaultValue = {casa.servizi}
                onChange = {this.onChange}
                className = "i"
              />
              <label htmlFor = "descrizione">Descrizione</label>
              <textarea 
                id = 'descrizione'
                name = 'descrizione'
                defaultValue = {casa.descrizione}
                onChange = {this.onChange}
                className = 'iTA'
              >
              </textarea>
          
                <Form.Group id = 'posti_letto' name = 'posti_letto' >
                <Form.Label>Posti Letto</Form.Label>
                <Form.Control 
                  id = 'posti_letto'
                  name = 'posti_letto'
                  defaultValue = {casa.posti_letto}
                  as = "select"   
                  onChange = {this.onChange}  
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
              
          
              <label htmlFor = "tariffa_casa">Prezzo</label>
              <input
                type = "text"
                pattern = "^\d+(.\d{1,2})?$"
                title = "Inserire un valore numerico usando un punto per i valori decimali"
                id = "tariffa_casa"
                name = 'tariffa_casa'
                defaultValue = {casa.tariffa_casa}
                onChange = {this.onChange}
                className = "i"
              />
              <Form.Group>
                <label>Modifica le foto della tua struttura</label>
                <Form.Row className = "justify-content-center">
                <input
                  id = "imgCV_path1"
                  name = "imgCV_path1SRC"
                  onChange = {this.onChangeImg}
                  type = "file"
                  className = "inputImg"
                  accept = "image/*"
                />
                <img src = {this.state.imgCV_path1SRC} alt = {"Foto 1 " + this.state.nome_proprieta} ></img>
                <input
                  id = "imgCV_path2"
                  name = "imgCV_path2SRC"
                  onChange = {this.onChangeImg}
                  type = "file"
                  className = "inputImg"
                  accept = "image/*"
                />
                <img src = {this.state.imgCV_path2SRC} alt = {"Foto 2 " + this.state.nome_proprieta}></img>
              <input
                  id = "imgCV_path3"
                  name = "imgCV_path3SRC"
                  onChange = {this.onChangeImg}
                  type = "file"
                  className = "inputImg"
                  accept = "image/*"
                />
                <img src = {this.state.imgCV_path3SRC} alt = {"Foto 3 " + this.state.nome_proprieta}></img>
                <input
                  id = "imgCV_path4"
                  name = "imgCV_path4SRC"
                  onChange = {this.onChangeImg}
                  type = "file"
                  className = "inputImg"
                  accept = "image/*"
                />
                <img src = {this.state.imgCV_path4SRC} alt = {"Foto 4 " + this.state.nome_proprieta}></img>
                </Form.Row>
              </Form.Group>

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

export default ModificaCasaVacanza;