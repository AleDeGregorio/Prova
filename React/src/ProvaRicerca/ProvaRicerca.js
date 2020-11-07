import React, { useState } from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap'
import DatePicker from './InputDate';
import moment from "moment";
import './ProvaRicerca.css'

const ProvaRicerca = () => {
    

    const [dates, set_dates] = useState({
        startDate: moment(),
        endDate: null
      });

    const setStartDate = startDate => {
        set_dates({
          ...dates,
          startDate
        });
      };
    
      const setEndDate = endDate => {
        set_dates({
          ...dates,
          endDate
        });
      };

    return(
        <div className="ContainerRicerca">
        <Form className="BarraRicerca">
          <div className="Prova">
            <Form.Row>
                <Form.Group controlId="formGridEmail">
                <Form.Label>Dove?</Form.Label>
                <Form.Control type="name" placeholder="Inserire città da visitare"/>
                </Form.Group>
                
                <Form.Group>
                <DatePicker
                    dates={dates}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    set_dates={set_dates}
                />
                </Form.Group>

                <Form.Group controlId="formGridState">
                <Form.Label>Ospiti</Form.Label>
                <Form.Control as="select" placeholder="Inserire numero ospiti">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </Form.Control>
                </Form.Group> 

                <Form.Group>
                  <Button type="submit">Cerca</Button>
                </Form.Group>
                
            </Form.Row>
            </div>
        </Form>
        </div>

    );
}
export default ProvaRicerca;