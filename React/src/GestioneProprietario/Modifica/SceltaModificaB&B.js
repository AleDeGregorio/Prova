import React from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import './SceltaModifica.css'
import {SiCashapp} from "react-icons/si";
import {RiAccountBoxLine} from "react-icons/ri";
import {Link} from 'react-router-dom'
import {Col} from 'react-bootstrap'

class SceltaModificaBeB extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dati_bb: this.props.history.location.state ? this.props.history.location.state.dati_bb : ''
        }
    }

    render() {
        return(
            <div className="carte_prop" >
                <Link className="Link" to = {{
                    pathname: "/ModificaB&B",
                    state: { 
                        dati_bb: this.state.dati_bb
                    }
                    }}
                >
                    <Card className="propScelta">
                        <Card.Body>
                            <Card.Title>Modifica struttura B&B</Card.Title>
                            <Card.Text>Visualizza i dati della tua struttura e modificali come preferisci</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>

                <Link className="Link" to = {{
                    pathname: "/ElencoListaStanze",
                    state: { 
                        dati_bb: this.state.dati_bb
                    }
                    }}
                >
                    <Card className="propScelta">
                        <Card.Body>
                            <Card.Title>Modifica stanze B&B</Card.Title>
                            <Card.Text>Modifica le informazioni delle stanze della tua struttura</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
          </div>
        );
    }
}
export default SceltaModificaBeB;