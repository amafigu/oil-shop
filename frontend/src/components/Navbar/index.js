import { CartContext } from "#context/cartContext"
import {
  getInputChangeAndOpenList,
  navigateToProductAndCloseDropdown,
  searchAndNavigateToProduct,
  titleCase,
  useGetProducts,
  useHideListOnOuterClick,
  useListenScrollAndCloseDropdown,
} from "#utils/utils"
import { useLocation, useNavigate } from "react-router-dom"

import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import LanguageDropdown from "./LanguageDropdown"
import MenuMobile from "./MenuMobile"
import SubNavbar from "./SubNavbar"
import styles from "./navbar.module.scss"

const Navbar = ({ productCategories }) => {
  const [isProductDropdownVisible, setProductDropdownVisible] = useState(false)
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")
  const [matchedProducts, setMatchedProducts] = useState([])
  const { getAllProductsQuantity } = useContext(CartContext)

  const searchProductListDropdownRef = useRef(null)
  const modalRef = useRef(null)
  const navigate = useNavigate()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    } else {
      setCategory("all")
    }
  }, [queryCategory])

  const getPressedEnterKeyInSearchField = (e) => {
    if (e.key === "Enter") {
      searchAndNavigateToProduct(products, searchText, navigate)
    }
  }
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
            <div
              className={styles.searchIconIWrapper}
              style={isProductDropdownVisible ? { display: "none" } : {}}
              onClick={() => setProductDropdownVisible(true)}
            >
              <FontAwesomeIcon icon={faSearch} size={"xl"} />
            </div>
            {matchedProducts.length > 0 && isProductDropdownVisible && (
              <div className={styles.dropdownModal}></div>
            )}
            <div className={styles.productsDropdownWrapper}>
              <div className={styles.searchProductContainer}>
                <div className={styles.searchProduct}>
                  <div
                    className={
                      isProductDropdownVisible
                        ? styles.searchTextInputAndProductList
                        : styles.hidden
                    }
                  >
                    <div className={styles.searchTextInputAndIcon}>
                      <input
                        className={styles.searchTextInput}
                        onChange={getInputChangeAndOpenList(
                          products,
                          setSearchText,
                          setSearchDropdownOpen,
                          setMatchedProducts,
                        )}
                        onKeyDown={getPressedEnterKeyInSearchField}
                        placeholder='Search Product'
                        value={searchText}
                      ></input>
                      <div
                        className={styles.searchIconIWrapperOut}
                        onClick={() => setProductDropdownVisible(false)}
                      >
                        <FontAwesomeIcon icon={faSearch} size={"xl"} />
                      </div>
                    </div>

                    {matchedProducts.length > 0 && isSearchDropdownOpen && (
                      <>
                        <div
                          className={styles.searchDropdown}
                          ref={searchProductListDropdownRef}
                        >
                          {matchedProducts.map((product) => (
                            <div
                              className={styles.dropdownListItem}
                              key={product.name}
                              onClick={() =>
                                navigateToProductAndCloseDropdown(
                                  product.name,
                                  navigate,
                                  setProductDropdownVisible,
                                  setMatchedProducts,
                                  setSearchText,
                                )
                              }
                            >
                              <div className={styles.dropdownListItemImage}>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/" +
                                    product.image
                                  }
                                  alt={product.name}
                                  className={styles.listItemImage}
                                />
                              </div>

                              <div className={styles.dropdownListItemName}>
                                {titleCase(product.name, "_")}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
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
              {isMenuOpen && (
                <MenuMobile
                  productCategories={productCategories}
                  category={category}
                  setCategory={setCategory}
                  setMenuOpen={setMenuOpen}
                />
              )}
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
              <div className={styles.searchIconAndDropdownWrapperRight}>
                <div
                  className={styles.searchIconIWrapper}
                  style={isProductDropdownVisible ? { display: "none" } : {}}
                  onClick={() => setProductDropdownVisible(true)}
                >
                  <FontAwesomeIcon icon={faSearch} size={"xl"} />
                </div>

                {/*<ProductsDropdown
                  isProductDropdownVisible={
                    isProductDropdownVisible
                  }
                  products={products}
                  setProductDropdownVisible={
                    setProductDropdownVisible
                  }
                  setSearchText={setSearchText}
                  setSearchDropdownOpen={setSearchDropdownOpen}
                  setMatchedProducts={setMatchedProducts}
                  matchedProducts={matchedProducts}
                  isSearchDropdownOpen={isSearchDropdownOpen}
                  searchText={searchText}
                />*/}
              </div>

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
