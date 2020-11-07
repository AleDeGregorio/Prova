/*CSS FATTO*/

import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"

import "./InserimentoProprietà.css";


class InserimentoProprietà extends React.Component {
  
 render(){
  return (
    <div className="background">
    <div className="containerNewSelezione">  
      <div className="contentNew">
        <form >
          <h2>Seleziona il tipo di struttura che stai inserendo</h2>
          <Form.Group>
            <Form.Row className="justify-content-center">
            <Button variant="primary" className="bottoniScelta" href="/InserimentoCasaVacanza">
              Casa Vacanza
            </Button>
            <Button variant="primary" className="bottoniScelta" href="/InserimentoBnB">
              B&B
            </Button>
            </Form.Row>
          </Form.Group>
        </form>
      </div>
    </div>
    </div>
  );}
}

export default InserimentoProprietà;
