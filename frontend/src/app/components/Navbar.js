import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import useLocaleContext from "../../context/locale.context"

const Navbar = () => {
  const { translate } = useLocaleContext()
  return (
    <nav className={styles.navbar}>
      {}
      <NavLink
        className={styles.navLink}
        to='/'
        activeClassName={styles.activeLink}
      >
        {translate.navbar.home}
      </NavLink>
      <NavLink
        className={styles.navLink}
        to='/shop'
        activeClassName={styles.activeLink}
      >
        {translate.navbar.shop}
      </NavLink>
      <NavLink
        className={styles.navLink}
        to='/about'
        activeClassName={styles.activeLink}
      >
        {translate.navbar.about}
      </NavLink>
    </nav>
  )
}

export default Navbar
