/*import React from "react";
import './Autenticazione.css'
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Cliente from '../components/ClientePage';

import { Redirect } from "react-router-dom";


class Autenticazione extends React.Component {

  constructor(props)
  {
    super(props);

    this.state = {
      type: "signIn",
      containerClass: "containerAutenticazione "
    }
  }
  handleOnClick = (text) => {
    if(text !== this.state.type) {
      this.setState({ type: text });
    }
    if(text === "signUp") {
      this.setState({ containerClass: "containerAutenticazione right-panel-active" })
    }
    else {
      this.setState({ containerClass: "containerAutenticazione " });
    }
  }

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
      return (
        <div className="Autenticazione">
          <div className={this.state.containerClass} id="containerAutenticazione">
            <SignUpForm 
              onChange = {this.props.onChange} 
            />
            <SignInForm 
              onChange = {this.props.onChange}  
              onSubmit = {this.props.onSubmitLogin}
            />
            <div className="overlay-containerAutenticazione">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Sei già iscritto?</h1>
                  <p>Inserisci qui la tua e-mail e la tua password</p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => this.handleOnClick("signIn")}
                  >
                    Accedi
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Non sei ancora iscritto?</h1>
                  <p>Inserisci qui i tuoi dati</p>
                  <button
                    className="ghost "
                    id="signUp"
                    onClick={() => this.handleOnClick("signUp")}
                  >
                    Registrati
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Autenticazione;*/