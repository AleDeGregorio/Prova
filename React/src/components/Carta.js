import React from "react";
import Card from '../Card';
import './Carta.css';

function Carta() {
  return (
    <div className="Carta justify-content-between">
      <Card className="cardHome"
        imgUrl="https://images.unsplash.com/photo-1509233725247-49e657c54213?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80"
        title="Casa vacanza"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            deleniti dicta officia temporibus magni! Sint soluta excepturi
            suscipit alias ut!"
            
      />
      <Card className="cardHome"
        imgUrl="https://content.r9cdn.net/rimg/kimg/38/24/d064765e-58dba14d.jpg?crop=true&width=500&height=350"
        title="BnB"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            deleniti dicta officia temporibus magni! Sint soluta excepturi
            suscipit alias ut!"
      />
     
    </div>
  );
}

export default Carta;