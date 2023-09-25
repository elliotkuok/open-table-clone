import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-col">
          <h5>ELLIOT ON THE WEB</h5>
            <a href="https://elliotkuok.com" target="_blank">Portfolio Website</a>
            <a href="https://github.com/elliotkuok" target="_blank">Github</a>
            <a href="https://www.linkedin.com/in/elliotkuok/" target="_blank">LinkedIn</a>
        </div>
        <div className="footer-col">
          <h5>TECH STACK</h5>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">Javascript</a>
            <a href="https://rubyonrails.org/" target="_blank">Ruby on Rails</a>
            <a href="https://react.dev/" target="_blank">React</a>
            <a href="https://redux.js.org/" target="_blank">Redux</a>
            <a href="https://html.com/html5/" target="_blank">HTML5</a>
            <a href="https://www.w3schools.com/css/" target="_blank">CSS3</a>
        </div>  
        <div className="footer-col">
            <h5>LIBRARIES</h5>
            <a href="https://www.npmjs.com/package/js-datepicker" target="_blank">Datepicker.js</a>
            <a href="https://codepen.io/4m6/pen/wvqEzEr" target="_blank">Star Ratings</a>
            <a href="https://github.com/jackocnr/intl-tel-input" target="_blank">Telephone Input</a>
            <a href="https://date-fns.org/" target="_blank">Date-fns</a>
        </div>  
        <div className="footer-col">
            <h5>HOSTING/DATABASE</h5>
            <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>
            <a href="https://render.com/" target="_blank">Render</a>
        </div> 
      </div>
      <div id="copyright">Copyright © 2023 ReadyTable, Inc. 180 Geary St Fl 6, San Francisco CA 94108 - All rights reserved.</div>
    </footer>
  );
};

export default Footer;