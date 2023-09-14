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
import React, { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LanguageDropdown from "./LanguageDropdown"
import SubNavbar from "./SubNavbar"
import styles from "./navbar.module.scss"

const Navbar = () => {
  const [isLanguageDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState([])
  const [matchedProducts, setMatchedProducts] = useState([])
  const { getAllProductsQuantity } = useContext(CartContext)

  const navigate = useNavigate()

  const searchProductListDropdownRef = useRef(null)
  const modalRef = useRef(null)

  useHideListOnOuterClick(
    searchProductListDropdownRef,
    setSearchDropdownOpen,
    setMatchedProducts,
  )

  useGetProducts(setProducts)

  useListenScrollAndCloseDropdown(
    isLanguageDropdownOpen,
    setSearchDropdownOpen,
    setMatchedProducts,
    setSearchText,
  )

  const getPressedEnterKeyInSearchField = (e) => {
    if (e.key === "Enter") {
      searchAndNavigateToProduct(products, searchText, navigate)
    }
  }

  return (
    <div className={styles.navbarWrapper} ref={modalRef}>
      <div className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div
            className={`${styles.navbarColumn} ${styles.navbarColumnLeft}`}
          ></div>
          <div className={`${styles.navbarColumn} ${styles.navbarColumnLogo}`}>
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt='logo'
            />
          </div>

          <div className={`${styles.navbarColumn} ${styles.navbarColumnRight}`}>
            <div className={`${styles.searchProduct}`}>
              <div className={styles.searchTextInputAndProductList}>
                <div>
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
                </div>

                {matchedProducts.length > 0 && isLanguageDropdownOpen && (
                  <>
                    <div className={styles.dropdownModal}></div>
                    <div
                      ref={searchProductListDropdownRef}
                      className={styles.searchDropdown}
                    >
                      {matchedProducts.map((product) => (
                        <div
                          className={styles.dropdownListItem}
                          key={product.name}
                          onClick={() =>
                            navigateToProductAndCloseDropdown(
                              product.name,
                              navigate,
                              setSearchDropdownOpen,
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
            <span
              onClick={() => {
                setSearchDropdownOpen(
                  (prevIsSearchDropdownOpen) => !prevIsSearchDropdownOpen,
                )
                setMatchedProducts([])
                setSearchText("")
              }}
              className={`material-symbols-outlined ${styles.searchIcon}`}
            >
              search
            </span>
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
