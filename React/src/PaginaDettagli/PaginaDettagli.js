/*import React from "react";
import './PaginaDettagli.css';
import CaroselloDettagli from './CaroselloDettagli'; 
class PaginaDettagli extends React.Component{
constructor(props){
    super(props);
    this.state={id_proprieta:localStorage.getItem('id_proprieta'),
                apiResponse:[],
                error:false,
                errorMessage:''
             }
    }
componentDidMount(){
        const data= {id_proprieta:this.state.id_proprieta};
        fetch('localhost:9000/searchProprieta/results',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify(data)    
        })
    .then((result)=>result.text())
    .then((result)=>{
        this.setState({apiResponse:JSON.parse(result)});
        if (this.state.apiResponse.status==='error'){       //gestione errori
            this.setState({error:true, errorMessage:'this.state.apiResponse.message'});
        }
    })
}
//funzione per distinguere i servizi e parsarla?
render(){
    return(
        
        { this.state.apiResponse.map(((res)=>
        <div classNane="paginaDettagli">
            <div className="containerDettagli">
                <div className="Nome">
                    <h2>res.nome_proprieta</h2>
                    <span>res.indirizzo</span>
                </div>
                <CaroselloDettagli/>
                <div className="divDettagli">
                    <div className="row">
                        <div className="col">
                            <span>Panoramica</span>
                        </div>
                        <div className="col">
                        <ul>
                            <li>cacca</li>
                            <li>cacca</li>
                        </ul>
                        </div>
                        <div className="col">
                        <ul>
                            <li>cacca</li>
                            <li>cacca</li>
                        </ul>
                        </div>
                        <div className="col">
                        <ul>
                            <li>cacca</li>
                            <li>cacca</li>
                        </ul>
                        </div>
                    </div> 
                </div>
                <div className="divDettagli">
                    <div className="row">
                        <div className="col">
                            <span>Servizi</span>
                        </div>
                        <div className="col">
                        <ul>
                            <li>cacca</li>
                            <li>cacca</li>
                        </ul>
                        </div>
                        <div className="col">
                        <ul>
                            <li>cacca</li>
                            <li>cacca</li>
                        </ul>
                        </div>
                        <div className="col">
                        <ul>
                            <li>cacca</li>
                            <li>cacca</li>
                        </ul>
                        </div>
                    </div> 
                </div>
                <div className="Mappa">
                    <h2>Posizione</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3139.957480914129!2d13.341207586490786!3d38.0946534797024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1319ef9c66477947%3A0x61d1bb8b03eb7635!2sVia%20Pietro%20Donato%2C%2090128%20Palermo%20PA!5e0!3m2!1sit!2sit!4v1603997161886!5m2!1sit!2sit" width="50%" height="450" frameborder="0"  allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
                <div className="Recensioni">
                    <h2 className="RecensioniH2">Recensioni</h2>
                    <ul className="RecensioniUL">
                        <li>cacca</li>
                        <li>cacca</li>
                    </ul>
                </div>
                <div className="Contatti">
                    <h2 className="ContattiH2">Contatta Proprietario</h2>
                    <span className="ContattiSpan">Email Proprietario</span>
                </div>
            </div>
        </div>
        ))}

       });
}

export default PaginaDettagli;*/