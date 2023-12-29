import LogoutButton from "#components/LogoutButton"
import { CartContext } from "#context/cartContext"
import useUserContext from "#context/userContext"
import { Link, useNavigate } from "react-router-dom"

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
  const { isLoggedIn, setIsLoggedIn, setUserEmail, setUser, user } =
    useUserContext()

  const navigateAndCloseMenu = (route) => {
    setMenuOpen(false)
    navigate(route)
  }

  const { getAllProductsQuantity } = useContext(CartContext)

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
          {isLoggedIn ? (
            <div className={styles.userAndLogoutIconContainer}>
              <div className={styles.listItem}>
                <LogoutButton
                  navigate={navigate}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserEmail={setUserEmail}
                  setUser={setUser}
                />
              </div>
              <div className={styles.listItem}>
                <Link
                  className={styles.linkChild}
                  to={
                    user && user.roleId === 2 // TODO: change the 2 for admin roleId and send the user with role name from backend
                      ? "/users/current-admin"
                      : "/users/current-customer"
                  }
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </div>
            </div>
          ) : (
            <Link className={styles.linkChild} to='/login'>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
          {/* <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu("/login")}
          >
            <span className={styles.linkContent}>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </li> */}
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
