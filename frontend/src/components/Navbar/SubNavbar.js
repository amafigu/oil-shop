import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./subNavbar.module.scss"
import useLocaleContext from "../../context/localeContext"

const SubNavbar = () => {
  const { translate } = useLocaleContext()
  return (
    <div className={styles.navbarContainer}>
      <div>
        <nav className={styles.navbar}>
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
    </div>
  )
}

export default SubNavbar
