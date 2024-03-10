import { ROUTES_WITHOUT_NAVBAR } from "#constants/routes"
//import useCartContext from "#context/cartContext"
//import useUserContext from "#context/userContext"
// import { useGetProducts } from "#hooks/useGetProducts"
import React, { useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { Logo } from "./Logo"
import MenuMobile from "./MenuMobile"
import { NavLinks } from "./NavLinks"
import { SearchBar } from "./SearchBar"
import styles from "./navbar.module.scss"
export const Navbar = () => {
  const [showProductsSearchbar, setShowProductsSearchbar] = useState(false)
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchProductText, setSearchProductText] = useState("")
  const [products, setProducts] = useState([])
  const [matchedProducts, setMatchedProducts] = useState([{ name: "aa" }])
  //const [isDropdownOpen, setDropdownOpen] = useState(false)
  //const { getAllProductsQuantity } = useCartContext()
  //const { isLoggedIn, setIsLoggedIn, user } = useUserContext()
  const location = useLocation()
  const currentPath = location.pathname
  //const navigate = useNavigate()
  const searchProductListDropdownRef = useRef(null)
  //const modalRef = useRef(null)

  //useHideListOnOuterClick()
  //searchProductListDropdownRef,
  //setShowProductsSearchbar,
  //setMatchedProducts,

  //useGetProducts(setProducts)

  return (
    <>
      {!ROUTES_WITHOUT_NAVBAR.includes(currentPath) && (
        <nav className={styles.navbar}>
          <SearchBar
            products={products}
            showProductsSearchbar={showProductsSearchbar}
            setShowProductsSearchbar={setShowProductsSearchbar}
            searchProductText={searchProductText}
            setSearchProductText={setSearchProductText}
            setSearchDropdownOpen={setSearchDropdownOpen}
            setMatchedProducts={setMatchedProducts}
            matchedProducts={matchedProducts}
            searchProductListDropdownRef={searchProductListDropdownRef}
            isSearchDropdownOpen={isSearchDropdownOpen}
          />
          <Logo />
          <NavLinks />
          {showMobileMenu && (
            <MenuMobile setShowMobileMenu={setShowMobileMenu} />
          )}
        </nav>
      )}
    </>
  )
}
