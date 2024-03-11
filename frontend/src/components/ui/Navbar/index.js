import { ROUTES_WITHOUT_NAVBAR } from "#constants/routes"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Logo } from "./Logo"
import { MatchedProductsList } from "./MatchedProductsList"
import MenuMobile from "./MenuMobile"
import { NavLinks } from "./NavLinks"
import { SearchBar } from "./SearchBar"
import styles from "./navbar.module.scss"

export const Navbar = () => {
  const [showProductsSearchbar, setShowProductsSearchbar] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [matchedProducts, setMatchedProducts] = useState([])
  const [showLanguagesOptions, setShowLanguagesOptions] = useState(false)
  const [showMatchedProductsList, setShowMatchedProductsList] = useState(false)
  const [searchProductText, setSearchProductText] = useState("")
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <>
      {!ROUTES_WITHOUT_NAVBAR.includes(currentPath) && (
        <>
          <nav className={styles.navbar}>
            <SearchBar
              searchProductText={searchProductText}
              setSearchProductText={setSearchProductText}
              setMatchedProducts={setMatchedProducts}
              setShowMatchedProductsList={setShowMatchedProductsList}
            />
            <Logo />
            <NavLinks
              setShowMobileMenu={setShowMobileMenu}
              showLanguagesOptions={showLanguagesOptions}
              setShowLanguagesOptions={setShowLanguagesOptions}
            />
            {showMobileMenu && (
              <MenuMobile setShowMobileMenu={setShowMobileMenu} />
            )}
          </nav>
          {matchedProducts.length > 0 && showMatchedProductsList && (
            <MatchedProductsList
              matchedProducts={matchedProducts}
              setMatchedProducts={setMatchedProducts}
              setShowMatchedProductsList={setShowMatchedProductsList}
              setSearchProductText={setSearchProductText}
            />
          )}
        </>
      )}
    </>
  )
}
