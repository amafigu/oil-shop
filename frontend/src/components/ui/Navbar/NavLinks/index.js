import { ActionButton } from "#components/ui/ActionButton"
import LanguageDropdown from "#components/ui/LanguageDropdown"
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
import styles from "./navLinks.module.scss"

export const NavLinks = ({
  setShowMobileMenu,
  showProductsSearchbar,
  setShowProductsSearchbar,
  setDropdownOpen,
  isDropdownOpen,
}) => {
  const { getAllProductsQuantity } = useCartContext()
  const { setIsLoggedIn, isLoggedIn, user } = useUserContext()
  const navigate = useNavigate()

  return (
    <section className={styles.navLinks}>
      <ActionButton
        action={() => setShowMobileMenu(true)}
        text={<FontAwesomeIcon icon={getIconByName("faBars")} size={"xl"} />}
        className={STYLES.LINKS.NAVIGATION_MENU_LINK}
      />
      <ActionButton
        action={() => setShowProductsSearchbar(true)}
        text={<FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />}
        className={STYLES.LINKS.NAVIGATION_MENU_LINK}
      />
      <div
        role='button'
        onClick={() => setDropdownOpen((isDropdownOpen) => !isDropdownOpen)}
      >
        <FontAwesomeIcon icon={getIconByName("faGlobe")} />
        {!isDropdownOpen && (
          <FontAwesomeIcon icon={getIconByName("faChevronDown")} />
        )}
        {isDropdownOpen && (
          <FontAwesomeIcon icon={getIconByName("faChevronUp")} />
        )}
        {isDropdownOpen && <LanguageDropdown />}
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
