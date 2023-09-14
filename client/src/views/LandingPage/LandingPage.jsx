import React from "react";
import { Link } from "react-router-dom";
//import hook to fetch the countries right away
import { useFetchCountries } from "../../hooks/useFetchCountries";

import style from "./landingPage.module.scss";
import logo from "/img/logo2.png";
import backgroundVideo from "/video/landing-video.mp4";

const LandingPage = () => {
  useFetchCountries();
  console.log(useFetchCountries());

  return (
    <div className={style.container}>
      {/* background video */}
      <video className={style.backgroundVideo} autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={style.contentOverlay}>
        {/* website logo */}
        {/* <h1>&gt;_ World Trip</h1> */}
        <img className={style.img} src={logo} alt="Logo" />
        
        {/* button */}
        <Link to="/home" className={style.btn}>
        &gt;_ START JOURNEY
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
