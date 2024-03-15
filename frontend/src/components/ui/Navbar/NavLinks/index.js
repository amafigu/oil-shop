import { ActionButton } from "#components/ui/ActionButton"
import { LanguageSelector } from "#components/ui/LanguageSelector"
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
import { getIconByName } from "#utils/getIconByName"
import { onLogout } from "#utils/onLogout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import styles from "./navLinks.module.scss"

export const NavLinks = ({ showLanguagesOptions, setShowLanguagesOptions }) => {
  const { getAllProductsQuantity } = useCartContext()
  const { setIsLoggedIn, isLoggedIn, user } = useUserContext()
  const { setShowMobileMenu, setShowProductsSearchBar } = useMenuOptions()
  const navigate = useNavigate()

  const onMobileMenu = () => {
    setShowProductsSearchBar(false)
    setShowMobileMenu(true)
  }
  return (
    <section className={styles.navLinks} aria-label={"navigation section"}>
      <div className={styles.onlyMobile}>
        <ActionButton
          action={onMobileMenu}
          text={<FontAwesomeIcon icon={getIconByName("faBars")} size={"2xl"} />}
          className={STYLES.LINKS.NAVIGATION_MENU_LINK}
          ariaLabel={"show mobile menu"}
        />
      </div>
      <ul className={styles.hideOnMobile} aria-label={"navigation items"}>
        <li className={styles.listItem}>
          <ActionButton
            action={() => setShowProductsSearchBar((prevState) => !prevState)}
            text={
              <FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />
            }
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show search bar"}
          />
        </li>
        <li className={styles.languageSelector}>
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
        </li>
        {isLoggedIn ? (
          <li className={styles.userAndLogoutIconContainer}>
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
            <ActionButton
              action={() => onLogout(navigate, setIsLoggedIn)}
              text={
                <FontAwesomeIcon
                  icon={getIconByName("faArrowRightFromBracket")}
                  size={"xl"}
                />
              }
              className={STYLES.LINKS.NAVIGATION_MENU_LINK}
              ariaLabel={"logout"}
            />
          </li>
        ) : (
          <Link className={styles.linkChild} to={ROUTES_LOGIN}>
            <FontAwesomeIcon icon={getIconByName("faUser")} />
          </Link>
        )}
        <li
          className={styles.cartAndQuantity}
          aria-label={"cart items quantity"}
        >
          <Link className={styles.linkChild} to={ROUTES_CART}>
            <FontAwesomeIcon icon={getIconByName("faCartShopping")} />
          </Link>
          <span className={styles.productsQuantity}>
            {getAllProductsQuantity}
          </span>
        </li>
      </ul>
    </section>
  )
}
