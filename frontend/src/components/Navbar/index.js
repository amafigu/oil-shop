import { CartContext } from "#context/cartContext"
import {
  useGetProducts,
  useHideListOnOuterClick,
  useListenScrollAndCloseDropdown,
} from "#utils/utils"
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import LanguageDropdown from "./LanguageDropdown"
import MenuMobile from "./MenuMobile"
import ProductsDropdown from "./ProductsDropdown"
import SubNavbar from "./SubNavbar"
import styles from "./navbar.module.scss"

const Navbar = () => {
  const [isMobileProductDropdownVisible, setMobileProductDropdownVisible] =
    useState(false)

  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState([])
  const [matchedProducts, setMatchedProducts] = useState([])
  const { getAllProductsQuantity } = useContext(CartContext)

  const searchProductListDropdownRef = useRef(null)
  const modalRef = useRef(null)

  useHideListOnOuterClick(
    searchProductListDropdownRef,
    setSearchDropdownOpen,
    setMatchedProducts,
  )

  useGetProducts(setProducts)

  useListenScrollAndCloseDropdown(
    isSearchDropdownOpen,
    setSearchDropdownOpen,
    setMatchedProducts,
    setSearchText,
  )

  return (
    <div className={styles.navbarWrapper} ref={modalRef}>
      <div className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={`${styles.navbarColumn} ${styles.navbarColumnLeft}`}>
            <div className={styles.searchIconAndDropdownWrapper}>
              <div
                className={styles.searchIconIWrapper}
                style={
                  isMobileProductDropdownVisible ? { display: "none" } : {}
                }
                onClick={() => setMobileProductDropdownVisible(true)}
              >
                <FontAwesomeIcon icon={faSearch} size={"xl"} />
              </div>

              <ProductsDropdown
                isMobileProductDropdownVisible={isMobileProductDropdownVisible}
                products={products}
                setMobileProductDropdownVisible={
                  setMobileProductDropdownVisible
                }
                setSearchText={setSearchText}
                setSearchDropdownOpen={setSearchDropdownOpen}
                setMatchedProducts={setMatchedProducts}
                matchedProducts={matchedProducts}
                searchProductListDropdownRef={searchProductListDropdownRef}
                isSearchDropdownOpen={isSearchDropdownOpen}
                searchText={searchText}
              />
            </div>
          </div>

          <div className={`${styles.navbarColumn} ${styles.navbarColumnLogo}`}>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src={`${process.env.PUBLIC_URL}/assets/logo.png`}
                alt='logo'
              />
            </div>

            <div className={styles.menuWrapper}>
              {isMenuOpen && <MenuMobile setMenuOpen={setMenuOpen} />}
            </div>
          </div>

          <div className={`${styles.navbarColumn} ${styles.navbarColumnRight}`}>
            <div
              className={styles.menuIconWrapper}
              onClick={() => setMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} size={"xl"} />
            </div>
            <div className={styles.rightSideForBigScreen}>
              <ProductsDropdown
                products={products}
                setSearchText={setSearchText}
                setSearchDropdownOpen={setSearchDropdownOpen}
                setMatchedProducts={setMatchedProducts}
                matchedProducts={matchedProducts}
                searchProductListDropdownRef={searchProductListDropdownRef}
                isSearchDropdownOpen={isSearchDropdownOpen}
                searchText={searchText}
              />

              <div className={styles.gap}></div>
              <div className={styles.iconsNav}>
                <LanguageDropdown />

                <div className={styles.cartAndQuantity}>
                  <Link className={styles.linkChild} to='/cart'>
                    <div className='material-symbols-outlined'>
                      shopping_cart
                    </div>
                  </Link>
                  <span className={styles.productsQuantity}>
                    {getAllProductsQuantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SubNavbar />
      </div>
    </div>
  )
}

export default Navbar
