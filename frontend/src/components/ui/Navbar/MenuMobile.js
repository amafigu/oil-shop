import LanguageDropdown from "#components/ui/LanguageDropdown"
import LogoutButton from "#components/ui/LogoutButton"
import Sidebar from "#components/ui/Sidebar"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import {
  ROUTES_CART,
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_LOGIN,
} from "#utils/constants"
import {
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faGlobe,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./menuMobile.module.scss"

const MenuMobile = ({
  setMenuOpen,
  category,
  setCategory,
  productCategories,
}) => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn, user } = useUserContext()

  const navigateAndCloseMenu = (route) => {
    setMenuOpen(false)
    navigate(route)
  }

  const { getAllProductsQuantity } = useCartContext()

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
            onClick={() =>
              setLanguageDropdownOpen(
                (isLanguageDropdownOpen) => !isLanguageDropdownOpen,
              )
            }
          >
            <div className={styles.itemsContainer}>
              <FontAwesomeIcon icon={faGlobe} />

              {!isLanguageDropdownOpen && (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
              {isLanguageDropdownOpen && <FontAwesomeIcon icon={faChevronUp} />}
            </div>
          </li>
          {isLanguageDropdownOpen && (
            <LanguageDropdown setMenuOpen={setMenuOpen} />
          )}
          <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu(ROUTES_CART)}
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
              <div
                className={styles.listItem}
                onClick={() => setMenuOpen(false)}
              >
                <LogoutButton
                  navigate={navigate}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </div>
              <div
                className={styles.listItem}
                onClick={() => setMenuOpen(false)}
              >
                <Link
                  className={styles.linkChild}
                  to={
                    user && user.roleId === 2 // TODO: change the 2 for admin roleId and send the user with role name from backend
                      ? ROUTES_CURRENT_ADMIN
                      : ROUTES_CURRENT_CUSTOMER
                  }
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.listItem}>
              <Link className={styles.linkChild} to={ROUTES_LOGIN}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          )}

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
