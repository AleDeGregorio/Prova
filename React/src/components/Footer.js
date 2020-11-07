import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer >
      <div class="container">
        <div class="row justify-content-center">
          <div  id="p1">
            <h5 className="title">Privacy</h5>
            <ul className="list-unstyled">
              <li>Termini e Condizioni</li>
              <li>Privacy</li>
            </ul>
          </div>

          <div  id="p2">
            <h5 className="title">Prodotti</h5>
            <ul className="list-unstyled">
              <li>B&B</li>
              <li>Casa Vacanza</li>
            </ul>
          </div>

          <div id="p3">
            <h5 className="title">Contattaci</h5>
            <ul className="list-unstyled">
              <li>
                <i href="#" class="fa fa-phone" aria-hidden="true" />
                091 4422335
              </li>
            </ul>
          </div>
        </div>
        
        <div className="row">
          <div className="col justify-content-center">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </div>
          <div className="col align-self-end">
            <img src="https://www.flaticon.com/svg/static/icons/svg/733/733603.svg" className="icone-social" />
            <img src="https://www.flaticon.com/svg/static/icons/svg/1384/1384031.svg" className="icone-social"/>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;