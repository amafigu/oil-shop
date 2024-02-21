import useLocaleContext from "#context/localeContext"
import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import styles from "./subNavbar.module.scss"
const SubNavbar = () => {
  const { translate } = useLocaleContext()

  const location = useLocation()
  return (
    <div className={styles.subNavbarWrapper}>
      <nav className={styles.subNavbar}>
        <NavLink
          className={`${styles.navLink} ${
            location.pathname === "/" ? styles.activeCategory : ""
          }`}
          to='/'
        >
          {translate.components.navbar.home}
        </NavLink>
        <NavLink
          className={`${styles.navLink} ${
            location.pathname === "/shop" ? styles.activeCategory : ""
          }`}
          to='/shop'
        >
          {translate.components.navbar.shop}
        </NavLink>
        <NavLink
          className={`${styles.navLink} ${
            location.pathname === "/about" ? styles.activeCategory : ""
          }`}
          to='/about'
        >
          {translate.components.navbar.about}
        </NavLink>
      </nav>
    </div>
  )
}

export default SubNavbar
