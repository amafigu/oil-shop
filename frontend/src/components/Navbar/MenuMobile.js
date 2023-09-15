import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar"
import styles from "./menuMobile.module.scss"

const Menu = ({ setMenu }) => {
  const [category, setCategory] = useState("all")

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
    setMenu(false)
    navigate(route)
  }

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuAndMailButtonContainer}>
        <ul className={styles.menu}>
          <li
            className={`${styles.listItem} ${styles.closeIcon}`}
            onClick={() => setMenu(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </li>
          <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu("/about")}
          >
            <span className={styles.linkContent}>about</span>
          </li>
        </ul>
        <Sidebar category={category} setCategory={setCategory} />
      </div>
    </div>
  )
}

export default Menu
