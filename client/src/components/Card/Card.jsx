import React from "react";

import style from "./Card.module.scss";
import { NavLink } from "react-router-dom";

const Card = ({ name, flag, continent }) => {
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={flag} alt={`${name} flag`} />
      </div>
      <div className={style.infoContainer}>
        <h4 className={style.nameCountry}>{name}</h4>
        <p>Continent ↴</p>
        <h4>{continent}</h4>
      </div>
    </div>
  );
};

export default Card;
