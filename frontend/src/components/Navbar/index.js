import { CartContext } from "#context/cartContext"
import {
  useGetProducts,
  useHideListOnOuterClick,
  useListenScrollAndCloseDropdown,
} from "#utils/utils"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LanguageDropdown from "./LanguageDropdown"
import MenuMobile from "./MenuMobile"
import ProductsDropdown from "./ProductsDropdown"
import SubNavbar from "./SubNavbar"
import styles from "./navbar.module.scss"

const Navbar = () => {
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState([])
  const [matchedProducts, setMatchedProducts] = useState([])
  const { getAllProductsQuantity } = useContext(CartContext)

  const navigate = useNavigate()

  const searchProductListDropdownRef = useRef(null)
  const modalRef = useRef(null)
  const menuDropdownRef = useRef(null)

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
          <div
            className={`${styles.navbarColumn} ${styles.navbarColumnLeft}`}
          ></div>
          <div className={`${styles.navbarColumn} ${styles.navbarColumnLogo}`}>
            <div className={styles.searchIconWrapper}>
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
            </div>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src={`${process.env.PUBLIC_URL}/assets/logo.png`}
                alt='logo'
              />
            </div>

            <div
              className={styles.menuIconWrapper}
              onClick={() => setMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} size={"xl"} />
            </div>

            <div className={styles.menuWrapper}>
              {isMenuOpen && <MenuMobile setMenuOpen={setMenuOpen} />}
            </div>
          </div>

          <div className={`${styles.navbarColumn} ${styles.navbarColumnRight}`}>
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
            <nav className={styles.iconsNav}>
              <LanguageDropdown />

              <div className={styles.cartAndQuantity}>
                <Link className={styles.linkChild} to='/cart'>
                  <span className='material-symbols-outlined'>
                    shopping_cart
                  </span>
                </Link>
                <span className={styles.productsQuantity}>
                  {getAllProductsQuantity}
                </span>
              </div>
            </nav>
          </div>
        </div>
        <SubNavbar />
      </div>
    </div>
  )
}

export default Navbar
