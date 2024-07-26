import { WITHOUT_NAVBAR } from "@/constants/routes"
import { useMenuContext } from "@/context/menuContext"
import { useProductCategory } from "@/hooks/useProductCategory"
import { useTranslation } from "@/hooks/useTranslation"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { useLocation } from "react-router-dom"
import { ActionButton } from "../ActionButton"
import { Sidebar } from "../Sidebar"
import { Logo } from "./Logo"
import { NavLinks } from "./NavLinks"
import { SearchBar } from "./SearchBar"
import styles from "./navbar.module.scss"

export const Navbar: FC = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const { setShowSidebar, showSidebar } = useMenuContext()
  const { categories, setSortCategory } = useProductCategory()
  const { components } = useTranslation()

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.upperOptionsContainer}>
            <div className={styles.openSidebarMobile}>
              <ActionButton
                action={() => setShowSidebar(true)}
                text={
                  <FontAwesomeIcon
                    icon={getIconByName("faBars")}
                    size={"2xl"}
                    color='#fff'
                  />
                }
                className={"openMobileMenu"}
              />
            </div>
            <div className={styles.logoContainer}>
              <Logo />
            </div>
            {!WITHOUT_NAVBAR.includes(currentPath) && (
              <div
                className={`${styles.navLinksContainerMobile} ${styles.showOnMobile}`}
              >
                <NavLinks />
              </div>
            )}
          </div>
          {!WITHOUT_NAVBAR.includes(currentPath) && (
            <>
              <div className={styles.hideOnMobile}>
                <ActionButton
                  action={() => setShowSidebar(true)}
                  className={`navbarCategories`}
                >
                  <FontAwesomeIcon
                    icon={getIconByName("faBars")}
                    size={"xl"}
                    color='#fff'
                  />
                  <span className={styles.categoryButtonText}>
                    {components.navbar.showCategoriesButton}
                  </span>
                </ActionButton>
              </div>

              <div className={styles.searchbarContainer}>
                <SearchBar />
              </div>
              <div
                className={`${styles.navLinksContainer} ${styles.hideOnTablet}`}
              >
                <NavLinks />
              </div>
            </>
          )}
        </nav>

        {showSidebar && (
          <Sidebar
            items={categories}
            setShowSidebar={setShowSidebar}
            setItems={setSortCategory}
            showSidebar={showSidebar}
          />
        )}
      </header>
    </>
  )
}
