import { ActionButton } from "#components/ui/ActionButton"
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
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { LanguageSelector } from "../../LanguageSelector"
import styles from "./navLinks.module.scss"

export const NavLinks = ({
  setShowMobileMenu,
  setShowProductsSearchbar,
  showLanguagesOptions,
  setShowLanguagesOptions,
}) => {
  const { getAllProductsQuantity } = useCartContext()
  const { setIsLoggedIn, isLoggedIn, user } = useUserContext()
  const navigate = useNavigate()
  console.log(showLanguagesOptions)
  return (
    <section className={styles.navLinks}>
      <div className={styles.onlyMobile}>
        <ActionButton
          action={() => setShowMobileMenu(true)}
          text={<FontAwesomeIcon icon={getIconByName("faBars")} size={"xl"} />}
          className={STYLES.LINKS.NAVIGATION_MENU_LINK}
        />
      </div>
      <div className={styles.onlyMobile}>
        <ActionButton
          action={() => setShowProductsSearchbar((prevState) => !prevState)}
          text={
            <FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />
          }
          className={STYLES.LINKS.NAVIGATION_MENU_LINK}
        />
      </div>
      <div>
        <ActionButton
          action={() => setShowLanguagesOptions((prevState) => !prevState)}
          text={<FontAwesomeIcon icon={getIconByName("faGlobe")} size={"xl"} />}
          className={STYLES.LINKS.NAVIGATION_MENU_LINK}
        />

        {!showLanguagesOptions && (
          <FontAwesomeIcon icon={getIconByName("faChevronDown")} />
        )}
        {showLanguagesOptions && (
          <FontAwesomeIcon icon={getIconByName("faChevronUp")} />
        )}
        {showLanguagesOptions && (
          <LanguageSelector setShowLanguagesOptions={setShowLanguagesOptions} />
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
    </section>
  )
}
