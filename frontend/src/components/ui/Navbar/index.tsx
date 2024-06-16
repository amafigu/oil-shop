import { WITHOUT_NAVBAR } from "@/constants/routes"
import { useMenuOptions } from "@/hooks/useMenuOptions"
import { FC, useState } from "react"
import { useLocation } from "react-router-dom"
import { Logo } from "./Logo"
import { MatchedProductsList } from "./MatchedProductsList"
import { MobileMenu } from "./MobileMenu"
import { NavLinks } from "./NavLinks"
import { SearchBar } from "./SearchBar"
import styles from "./navbar.module.scss"

export const Navbar: FC = () => {
  const [matchedProducts, setMatchedProducts] = useState([])
  const [showMatchedProductsList, setShowMatchedProductsList] = useState(false)
  const [searchProductText, setSearchProductText] = useState("")
  const location = useLocation()
  const currentPath = location.pathname
  const { showMobileMenu } = useMenuOptions()

  return (
    <>
      {!WITHOUT_NAVBAR.includes(currentPath) && (
        <>
          <nav className={styles.container}>
            <SearchBar
              searchProductText={searchProductText}
              setSearchProductText={setSearchProductText}
              setMatchedProducts={setMatchedProducts}
              setShowMatchedProductsList={setShowMatchedProductsList}
            />
            <Logo />
            <NavLinks />
          </nav>
          {matchedProducts.length > 0 && showMatchedProductsList && (
            <MatchedProductsList
              matchedProducts={matchedProducts}
              setMatchedProducts={setMatchedProducts}
              setShowMatchedProductsList={setShowMatchedProductsList}
              setSearchProductText={setSearchProductText}
            />
          )}
          {showMobileMenu && <MobileMenu />}
        </>
      )}
    </>
  )
}