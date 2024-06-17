import { ActionButton } from "@/components/ui/ActionButton"
import { CategoryMenu } from "@/components/ui/CategoryMenu"
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
import { Link } from "react-router-dom"
import styles from "./mobileMenu.module.scss"

export const MobileMenu = () => {
  const { isLoggedIn, user } = useUserContext()
  const { setShowMobileMenu, setShowProductsSearchBar } = useMenuOptions()
  const { getAllProductsQuantity } = useCartContext()

  const onSearchBarToggle = () => {
    setShowProductsSearchBar(true)
    setShowMobileMenu(false)
  }
  return (
    <nav
      className={styles.wrapper}
      aria-label='navigation menu for mobile devices'
    >
      <ul className={styles.list}>
        <li className={`${styles.closeIcon} ${styles.item}`}>
          <ActionButton
            action={() => setShowMobileMenu(false)}
            text={<FontAwesomeIcon icon={getIconByName("faX")} size={"xl"} />}
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show mobile menu"}
          />
        </li>
        <li className={styles.item}>
          <ActionButton
            action={onSearchBarToggle}
            text={
              <FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />
            }
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show search bar"}
          />
        </li>
        <li className={`${styles.item} ${styles.container}`}>
          <LanguageSelector />
        </li>
        <li
          className={`${styles.item} ${styles.container}`}
          aria-label={"navigate to cart"}
        >
          <Link onClick={() => setShowMobileMenu(false)} to={CART}>
            <FontAwesomeIcon icon={getIconByName("faCartShopping")} />
            <span>{getAllProductsQuantity}</span>
          </Link>
        </li>
        {isLoggedIn ? (
          <ul className={styles.userIcons}>
            <li
              className={styles.item}
              onClick={() => setShowMobileMenu(false)}
            >
              <LogoutButton className={STYLES.LINKS.NAVIGATION_MENU_LINK} />
            </li>
            <li
              className={styles.item}
              onClick={() => setShowMobileMenu(false)}
              aria-label='navigate to user profile'
            >
              <Link
                to={
                  user && user.role?.name === "admin"
                    ? CURRENT_ADMIN
                    : CURRENT_CUSTOMER
                }
              >
                <FontAwesomeIcon icon={getIconByName("faUser")} />
              </Link>
            </li>
          </ul>
        ) : (
          <div className={styles.item}>
            <Link to={LOGIN}>
              <FontAwesomeIcon icon={getIconByName("faUser")} />
            </Link>
            <LogoutButton className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS} />
          </div>
        )}
      </ul>
      <CategoryMenu />
    </nav>
  )
}
