import { LanguageSelector } from "#components/ui/LanguageSelector"
import LogoutButton from "#components/ui/LogoutButton"
import { NavigationMenu } from "#components/ui/NavigationMenu"
import {
  ROUTES_CART,
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_LOGIN,
  ROUTES_SHOP,
} from "#constants/routes"
import { STYLES } from "#constants/styles"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import { useGetProductCategories } from "#hooks/useGetProductCategories"
import { useMenuMobile } from "#hooks/useMenuMobile"
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./menuMobile.module.scss"

const MenuMobile = () => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn, user } = useUserContext()
  const { productCategories } = useGetProductCategories()
  const { setShowMobileMenu } = useMenuMobile()
  const navigateAndCloseMenu = (route) => {
    setShowMobileMenu(false)
    navigate(route)
  }

  const { getAllProductsQuantity } = useCartContext()

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuAndMailButtonContainer}>
        <ul className={styles.menu}>
          <li
            className={`${styles.closeMenuIconContainer} ${styles.listItem}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <FontAwesomeIcon icon={getIconByName("faX")} />
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
              <FontAwesomeIcon icon={getIconByName("faGlobe")} />

              {!isLanguageDropdownOpen && (
                <FontAwesomeIcon icon={getIconByName("faChevronDown")} />
              )}
              {isLanguageDropdownOpen && (
                <FontAwesomeIcon icon={getIconByName("faChevronUp")} />
              )}
            </div>
          </li>
          {isLanguageDropdownOpen && <LanguageSelector />}
          <li
            className={styles.listItem}
            onClick={() => navigateAndCloseMenu(ROUTES_CART)}
          >
            <div className={styles.itemsContainer}>
              <FontAwesomeIcon icon={getIconByName("faCartShopping")} />

              <span className={styles.productsQuantity}>
                {getAllProductsQuantity}
              </span>
            </div>
          </li>
          {isLoggedIn ? (
            <div className={styles.userAndLogoutIconContainer}>
              <div
                className={styles.listItem}
                onClick={() => setShowMobileMenu(false)}
              >
                <LogoutButton
                  navigate={navigate}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </div>
              <div
                className={styles.listItem}
                onClick={() => setShowMobileMenu(false)}
              >
                <Link
                  className={styles.linkChild}
                  to={
                    user && user.roleId === 2 // TODO: change the 2 for admin roleId and send the user with role name from backend
                      ? ROUTES_CURRENT_ADMIN
                      : ROUTES_CURRENT_CUSTOMER
                  }
                >
                  <FontAwesomeIcon icon={getIconByName("faUser")} />
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.listItem}>
              <Link className={styles.linkChild} to={ROUTES_LOGIN}>
                <FontAwesomeIcon icon={getIconByName("faUser")} />
              </Link>
            </div>
          )}
          <NavigationMenu
            items={
              productCategories &&
              productCategories.map((category) => ({
                type: "category",
                path: `${ROUTES_SHOP}?category=${category.name}`,
                label: category.name,
              }))
            }
            className={STYLES.COMPONENTS.NAVIGATION_MENU.PRODUCT_CATEGORIES}
          />
        </ul>
      </div>
    </div>
  )
}

export default MenuMobile
