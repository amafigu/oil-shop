import {
  faChevronDown,
  faChevronUp,
  faGlobe,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar"
import LanguageDropdown from "./LanguageDropdown"
import styles from "./menuMobile.module.scss"

const Menu = ({ setMenuOpen, category, setCategory, productCategories }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const navigateAndCloseMenu = (route) => {
    setMenuOpen(false)
    navigate(route)
  }

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuAndMailButtonContainer}>
        <ul className={styles.menu}>
          <li
            className={`${styles.closeMenuIconContainer} ${styles.listItem}`}
            onClick={() => setMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </li>

          <li
            className={`${styles.listDropdownItem} ${styles.listItem}`}
            onClick={() => setDropdownOpen((isDropdownOpen) => !isDropdownOpen)}
          >
            <div className={styles.itemsContainer}>
              <FontAwesomeIcon icon={faGlobe} />

              {!isDropdownOpen && <FontAwesomeIcon icon={faChevronDown} />}
              {isDropdownOpen && <FontAwesomeIcon icon={faChevronUp} />}
            </div>
          </li>
          {isDropdownOpen && <LanguageDropdown setMenuOpen={setMenuOpen} />}
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
            productCategories={productCategories}
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
