import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import WhiteburgirLogo from "../../images/WhiteburgirLogo.svg";

const Navbar = () => {
  const store = useSelector((store) => store.cart.items);
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div className={styles.logoSection}>
            <a href="/">
              <ul>
                <li>
                  <img src={WhiteburgirLogo} alt="logo" />
                </li>
                <li>
                  <h1 id={styles.logo}>Burgirr</h1>
                </li>
              </ul>
            </a>
          </div>
          <div className={styles.navElements}>
            <ul>
              <li className={styles.home}>
                <Link to="/" className={styles.Link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className={styles.Link}>
                  <div className={styles.cartBox}>
                    <h4 id={styles.cartNumber}>{store.length}</h4>
                  </div>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
