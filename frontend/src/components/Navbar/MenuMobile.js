import { CartContext } from "#context/cartContext"

import {
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faGlobe,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../Sidebar"
import LanguageDropdown from "./LanguageDropdown"
import styles from "./menuMobile.module.scss"

const MenuMobile = ({
  setMenuOpen,
  category,
  setCategory,
  productCategories,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const navigateAndCloseMenu = (route) => {
    setMenuOpen(false)
    navigate(route)
  }

  const { getAllProductsQuantity } = useContext(CartContext)

  console.log("Menu productCategories ", productCategories)

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
            <div className={styles.itemsContainer}>
              <FontAwesomeIcon icon={faCartShopping} />

              <span className={styles.productsQuantity}>
                {getAllProductsQuantity}
              </span>
            </div>
          </li>
          <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu("/login")}
          >
            <span className={styles.linkContent}>
              <FontAwesomeIcon icon={faUser} />
            </span>
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

export default MenuMobile
