import { ActionButton } from "@/components/ui/ActionButton"
import { LanguageSelector } from "@/components/ui/LanguageSelector"
import { LogoutButton } from "@/components/ui/LogoutButton"
import {
  CART,
  CURRENT_ADMIN,
  CURRENT_CUSTOMER,
  LOGIN,
} from "@/constants/routes"
import { STYLES } from "@/constants/styles"
import { useCartContext } from "@/context/cartContext"
import { useUserContext } from "@/context/userContext"
import { useMenuOptions } from "@/hooks/useMenuOptions"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./navLinks.module.scss"

export const NavLinks: FC = () => {
  const { getAllProductsQuantity } = useCartContext()
  const { isLoggedIn, user } = useUserContext()
  const { setShowMobileMenu, setShowProductsSearchBar } = useMenuOptions()

  const onMobileMenu = () => {
    setShowProductsSearchBar(false)
    setShowMobileMenu(true)
  }
  return (
    <section className={styles.container} aria-label={"navigation section"}>
      <div className={styles.mobile}>
        <ActionButton
          action={onMobileMenu}
          text={<FontAwesomeIcon icon={getIconByName("faBars")} size={"2xl"} />}
          className={STYLES.LINKS.NAVIGATION_MENU_LINK}
          ariaLabel={"show mobile menu"}
        />
      </div>
      <ul className={styles.list} aria-label={"navigation items"}>
        <li>
          <ActionButton
            action={() =>
              setShowProductsSearchBar((prevState: boolean) => !prevState)
            }
            text={
              <FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />
            }
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show search bar"}
          />
        </li>
        <li className={styles.link}>
          <LanguageSelector />
        </li>
        {isLoggedIn ? (
          <li className={styles.logout}>
            <Link
              className={styles.link}
              to={
                (user && user.role?.name) === "admin"
                  ? CURRENT_ADMIN
                  : CURRENT_CUSTOMER
              }
            >
              <FontAwesomeIcon icon={getIconByName("faUser")} />
            </Link>
            <LogoutButton className={STYLES.LINKS.NAVIGATION_MENU_LINK} />
          </li>
        ) : (
          <Link className={styles.link} to={LOGIN}>
            <FontAwesomeIcon icon={getIconByName("faUser")} />
          </Link>
        )}
        <li className={styles.cart} aria-label={"cart items quantity"}>
          <Link className={styles.link} to={CART}>
            <FontAwesomeIcon icon={getIconByName("faCartShopping")} />
          </Link>
          <span className={styles.quantity}>{getAllProductsQuantity}</span>
        </li>
      </ul>
    </section>
  )
}
