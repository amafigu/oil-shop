import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar"
import styles from "./menuMobile.module.scss"

const Menu = ({ setMenuOpen }) => {
  const [category, setCategory] = useState("")

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

  const navigate = useNavigate()

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    } else {
      setCategory("all")
    }
  }, [queryCategory])

  const navigateAndCloseMenu = (route) => {
    setMenuOpen(false)
    navigate(route)
  }

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuAndMailButtonContainer}>
        <ul className={styles.menu}>
          <li
            className={`${styles.listItem} ${styles.closeIcon}`}
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </li>
          <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu("/cart")}
          >
            <span className={styles.linkContent}>Cart</span>
          </li>
          <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu("/about")}
          >
            <span className={styles.linkContent}>About</span>
          </li>

          <Sidebar
            setMenuOpen={setMenuOpen}
            category={category}
            setCategory={setCategory}
          />
        </ul>
      </div>
    </div>
  )
}

export default Menu
