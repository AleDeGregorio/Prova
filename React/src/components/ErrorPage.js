import React from 'react';
import './ErrorPage.css';

import { Redirect } from 'react-router-dom';

class ErrorPage extends React.Component {
    render() {
        if(this.props.location.state.error) {
            return(
                <div className = "Errore">
                    <h1>Si è verificato un errore!</h1>
                    <p>{this.props.location.state.errorMessage}</p>
                    <p>Tornare indietro e riprovare</p>
                </div>
            );
        }
        else {
            return <Redirect to = "/" />
        }
    }
}

export default ErrorPage;