import { logout } from "#api/auth/logout"
import { ActionButton } from "#components/ui/ActionButton"
import { LanguageSelector } from "#components/ui/LanguageSelector"
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
import { useMenuOptions } from "#hooks/useMenuOptions"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./mobileMenu.module.scss"
export const MobileMenu = ({
  showLanguagesOptions,
  setShowLanguagesOptions,
}) => {
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn, user } = useUserContext()
  const { productCategories } = useGetProductCategories()
  const { setShowMobileMenu, setShowProductsSearchBar } = useMenuOptions()
  const { getAllProductsQuantity } = useCartContext()

  const onSearchBarToggle = () => {
    setShowProductsSearchBar(true)
    setShowMobileMenu(false)
  }
  return (
    <div
      className={styles.mobileMenu}
      aria-label='navigation menu for mobile devices'
    >
      <ul className={styles.itemsList}>
        <li className={`${styles.closeMenuIconContainer} ${styles.listItem}`}>
          <ActionButton
            action={() => setShowMobileMenu(false)}
            text={<FontAwesomeIcon icon={getIconByName("faX")} size={"xl"} />}
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show mobile menu"}
          />
        </li>
        <li className={styles.listItem}>
          <ActionButton
            action={onSearchBarToggle}
            text={
              <FontAwesomeIcon icon={getIconByName("faSearch")} size={"xl"} />
            }
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show search bar"}
          />
        </li>
        <li className={`${styles.listItem} ${styles.itemsContainer}`}>
          <ActionButton
            action={() => setShowLanguagesOptions((prevState) => !prevState)}
            text={
              <FontAwesomeIcon icon={getIconByName("faGlobe")} size={"xl"} />
            }
            className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
            ariaLabel={"show language selector"}
          />

          {!showLanguagesOptions && (
            <FontAwesomeIcon
              icon={getIconByName("faChevronDown")}
              size={"xs"}
            />
          )}
          {showLanguagesOptions && (
            <FontAwesomeIcon icon={getIconByName("faChevronUp")} size={"xs"} />
          )}
          {showLanguagesOptions && (
            <LanguageSelector
              setShowLanguagesOptions={setShowLanguagesOptions}
            />
          )}
        </li>
        <li
          className={`${styles.listItem} ${styles.itemsContainer}`}
          aria-label={"navigate to cart"}
        >
          <Link onClick={() => setShowMobileMenu(false)} to={ROUTES_CART}>
            <FontAwesomeIcon icon={getIconByName("faCartShopping")} />
            <span className={styles.productsQuantity}>
              {getAllProductsQuantity}
            </span>
          </Link>
        </li>
        {isLoggedIn ? (
          <ul className={styles.userAndLogoutIconContainer}>
            <li
              className={styles.listItem}
              onClick={() => setShowMobileMenu(false)}
            >
              <ActionButton
                action={() => logout(navigate, setIsLoggedIn)}
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
            <li
              className={styles.listItem}
              onClick={() => setShowMobileMenu(false)}
              aria-label='navigate to user profile'
            >
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
            </li>
          </ul>
        ) : (
          <div className={styles.listItem}>
            <Link className={styles.linkChild} to={ROUTES_LOGIN}>
              <FontAwesomeIcon icon={getIconByName("faUser")} />
            </Link>
            <ActionButton
              action={() => logout(navigate, setIsLoggedIn)}
              text={<FontAwesomeIcon icon={getIconByName("faUser")} />}
              className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
              ariaLabel='logout'
            />
          </div>
        )}
      </ul>
      <NavigationMenu
        items={
          productCategories &&
          productCategories.map((category) => ({
            type: "category",
            path: `${ROUTES_SHOP}?category=${category.name}`,
            label: category.name,
          }))
        }
        className={STYLES.COMPONENTS.MOBILE_MENU.ITEMS}
      />
    </div>
  )
}
