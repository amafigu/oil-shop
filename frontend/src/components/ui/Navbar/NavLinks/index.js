import { ActionButton } from "#components/ui/ActionButton"
import { LanguageSelector } from "#components/ui/LanguageSelector"
import LogoutButton from "#components/ui/LogoutButton"
import {
  ROUTES_CART,
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_LOGIN,
} from "#constants/routes"
import { STYLES } from "#constants/styles"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import styles from "./navLinks.module.scss"

export const NavLinks = ({ showLanguagesOptions, setShowLanguagesOptions }) => {
  const { getAllProductsQuantity } = useCartContext()
  const { setIsLoggedIn, isLoggedIn, user } = useUserContext()
  const navigate = useNavigate()
  const { setShowMobileMenu, setShowProductsSearchBar } = useMenuOptions()

  const onMobileMenu = () => {
    setShowProductsSearchBar(false)
    setShowMobileMenu(true)
  }
  return (
    <section className={styles.navLinks}>
      <div className={styles.onlyMobile}>
        <ActionButton
          action={onMobileMenu}
          text={<FontAwesomeIcon icon={getIconByName("faBars")} size={"xl"} />}
          className={STYLES.LINKS.NAVIGATION_MENU_LINK}
        />
      </div>
      <div className={styles.hideOnMobile}>
        <div className={styles.listItem}>
          <ActionButton
            action={() => setShowProductsSearchBar((prevState) => !prevState)}
            text={
              <FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />
            }
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
          />
        </div>
        <div className={styles.languageSelector}>
          <ActionButton
            action={() => setShowLanguagesOptions((prevState) => !prevState)}
            text={
              <FontAwesomeIcon icon={getIconByName("faGlobe")} size={"xl"} />
            }
            className={STYLES.LINKS.NAVIGATION_MENU_LINK}
          />

          {!showLanguagesOptions && (
            <FontAwesomeIcon icon={getIconByName("faChevronDown")} />
          )}
          {showLanguagesOptions && (
            <FontAwesomeIcon icon={getIconByName("faChevronUp")} />
          )}
          {showLanguagesOptions && (
            <LanguageSelector
              setShowLanguagesOptions={setShowLanguagesOptions}
            />
          )}
        </div>
        {isLoggedIn ? (
          <div className={styles.userAndLogoutIconContainer}>
            <Link
              className={styles.linkChild}
              to={
                user && user.role === "admin"
                  ? ROUTES_CURRENT_ADMIN
                  : ROUTES_CURRENT_CUSTOMER
              }
            >
              <FontAwesomeIcon icon={getIconByName("faUser")} />
            </Link>
            <LogoutButton navigate={navigate} setIsLoggedIn={setIsLoggedIn} />
          </div>
        ) : (
          <Link className={styles.linkChild} to={ROUTES_LOGIN}>
            <FontAwesomeIcon icon={getIconByName("faUser")} />
          </Link>
        )}
        <div className={styles.cartAndQuantity}>
          <Link className={styles.linkChild} to={ROUTES_CART}>
            <FontAwesomeIcon icon={getIconByName("faCartShopping")} />
          </Link>
          <span className={styles.productsQuantity}>
            {getAllProductsQuantity}
          </span>
        </div>
      </div>
    </section>
  )
}
