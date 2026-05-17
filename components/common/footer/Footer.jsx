import React from "react";
import "./footerStyle.css";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faWhatsapp,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// bars
const facebookIcon = (
  <FontAwesomeIcon className="text-main-color" icon={faFacebook} />
);
const whatsIcon = (
  <FontAwesomeIcon className="text-main-color" icon={faWhatsapp} />
);
const twitterIcon = (
  <FontAwesomeIcon className="text-main-color" icon={faTwitter} />
);
const linkedinIcon = (
  <FontAwesomeIcon className="text-main-color" icon={faLinkedin} />
);

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col">
          <div className="">
            <h3 className="flex items-center text-[30px] text-main-color">
              <span
                className="italic flex items-center justify-center rounded-full text-[50px]
            w-[50px] h-[50px] text-main-color bg-dark-green"
              >
                J{" "}
              </span>
              Planner
            </h3>
          </div>
          <p className="min-w-[270px]">
            A tourism site that helps people make plans for days and visits such
            great places so that they can enjoy and spend happy times on a day
            organized with a well-planned plan. The purpose of this is to make
            things easier for the touriss to enjoy their trip in Egypt.
          </p>
        </div>
        <div className="col">
          <h3>
            Office{" "}
            <div className="under-line">
              <span></span>
            </div>
          </h3>

          <i className="fas fa-map-pin map-pin"></i>
          <p>Taha Hessin, ElMinia,ELminia</p>
          <p className="email-id">JournyPlanner@gmail.com</p>
          <h4>02 -0123456789</h4>
        </div>
        <div className="col">
          <h3>
            Links
            <div className="under-line">
              <span></span>
            </div>
          </h3>
          <ul className="foot-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/plans">Plans</Link>
            </li>
            <li>
              <Link to="/places">Places</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            websites
            <div className="under-line">
              <span></span>
            </div>
          </h3>
          <div className="social-icons">
            <button>{facebookIcon}</button>
            <button>{whatsIcon}</button>
            <button>{twitterIcon}</button>
            <button>{linkedinIcon}</button>
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">
        JournyPlanner &copy; 2026 - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
