import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-col">
            <h5>DISCOVER</h5>
            <p>Dining Rewards</p>
            <p>Private Dining</p>
            <p>Reserve for Others</p>
            <p>Restaurants Near Me</p>
            <p>Delivery Near Me</p>
            <p>Restaurants Open Now</p>
        </div>  
        <div className="footer-col">
            <h5>OPENTABLE</h5>
            <p>About Us</p>
            <p>Blog</p>
            <p>Careers</p>
            <p>Press</p>
        </div>   
        <div className="footer-col">
            <h5>MORE</h5>
            <p>OpenTable for iOS</p>
            <p>OpenTable for Android</p>
            <p>OpenTable for Android</p>
            <p>Contact Us</p>
        </div> 
        <div className="footer-col">
            <h5>BUSINESS</h5>
            <p>Restaurant reservation</p>
            <p>software</p>
            <p>Industry insights</p>
            <p>Hospitality resources</p>
            <p>Marketing resources</p>
            <p>Operation resources</p>
            <p>How to open a restaurant</p>
            <p>For restaurants</p>
            <p>For restaurant groups</p>
        </div>  
      </div>
      <div id="copyright">Copyright © 2023 ReadyTable, Inc. 180 Geary St Fl 6, San Francisco CA 94108 - All rights reserved.</div>
    </footer>
  );
};

export default Footer;