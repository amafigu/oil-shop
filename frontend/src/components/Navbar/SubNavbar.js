import React from "react"
import { NavLink } from "react-router-dom"
import useLocaleContext from "../../context/localeContext"
import styles from "./subNavbar.module.scss"

const SubNavbar = () => {
  const { translate } = useLocaleContext()
  return (
    <div className={styles.subNavbarWrapper}>
      <nav className={styles.subNavbar}>
        <NavLink className={styles.navLink} to='/'>
          {translate.components.navbar.home}
        </NavLink>
        <NavLink className={styles.navLink} to='/shop'>
          {translate.components.navbar.shop}
        </NavLink>
        <NavLink className={styles.navLink} to='/about'>
          {translate.components.navbar.about}
        </NavLink>
      </nav>
    </div>
  )
}

export default SubNavbar
