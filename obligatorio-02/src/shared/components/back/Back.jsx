import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Back.module.css";

// para ir para atras + titulo y subtitulo para que quede lidno
const Back = ({ title, subtitle, backLink }) => {
  return (
    <section className={styles.headerPage}>
      <NavLink to={backLink} className={styles.backLink}>
        <span className="material-symbols-rounded">arrow_back_ios</span>
      </NavLink>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </section>
  );
};

export default Back;
