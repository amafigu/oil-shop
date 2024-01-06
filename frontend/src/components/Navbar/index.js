import LanguageDropdown from "#components/LanguageDropdown"
import LogoutButton from "#components/LogoutButton"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import {
  LOGO_IMAGE,
  ROUTES_CART,
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_HOME,
  ROUTES_LOGIN,
} from "#utils/constants"
import { searchAndNavigateToProduct, useGetProducts } from "#utils/products"
import {
  getInputChangeAndOpenList,
  useHideListOnOuterClick,
} from "#utils/render"
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faGlobe,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import MenuMobile from "./MenuMobile"
import ProductsDropdown from "./ProductsDropdown"
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
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const { getAllProductsQuantity } = useCartContext()

  const { isLoggedIn, setIsLoggedIn, setUserEmail, setUser, user } =
    useUserContext()

  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

  const searchProductListDropdownRef = useRef(null)
  const modalRef = useRef(null)

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

  return (
    <div className={styles.navbarWrapper} ref={modalRef}>
      <div className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={`${styles.navbarColumn} ${styles.navbarColumnLeft}`}>
            <div
              className={styles.searchIconIWrapper}
              style={isProductDropdownVisible ? { display: "none" } : {}}
              onClick={() => {
                setProductDropdownVisible(true)
                setSearchText("")
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
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
                        onClick={() => {
                          setProductDropdownVisible(false)
                          setSearchText("")
                        }}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </div>
                    </div>

                    {matchedProducts.length > 0 && isSearchDropdownOpen && (
                      <>
                        <div
                          className={styles.searchDropdown}
                          ref={searchProductListDropdownRef}
                        >
                          <ProductsDropdown
                            setProductDropdownVisible={
                              setProductDropdownVisible
                            }
                            setSearchText={setSearchText}
                            setMatchedProducts={setMatchedProducts}
                            matchedProducts={matchedProducts}
                          />
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
              <Link className={styles.linkChild} to={ROUTES_HOME}>
                <img
                  className={styles.logo}
                  src={`${process.env.PUBLIC_URL}${LOGO_IMAGE}`}
                  alt='logo'
                />
              </Link>
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
              <div className={styles.iconsNav}>
                <div className={styles.searchIconAndDropdownWrapperRight}>
                  <div
                    className={styles.searchIconIWrapper}
                    style={isProductDropdownVisible ? { display: "none" } : {}}
                    onClick={() => setProductDropdownVisible(true)}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
                <div
                  onClick={() =>
                    setDropdownOpen((isDropdownOpen) => !isDropdownOpen)
                  }
                >
                  <div className={styles.itemsContainer}>
                    <div className={styles.languageChevronContainer}>
                      <FontAwesomeIcon icon={faGlobe} />

                      {!isDropdownOpen && (
                        <FontAwesomeIcon icon={faChevronDown} />
                      )}
                      {isDropdownOpen && <FontAwesomeIcon icon={faChevronUp} />}
                    </div>
                    <div className={styles.languageDropdownContainer}>
                      {isDropdownOpen && <LanguageDropdown />}
                    </div>
                  </div>
                </div>
                {isLoggedIn ? (
                  <div className={styles.userAndLogoutIconContainer}>
                    <Link
                      className={styles.linkChild}
                      to={
                        user && user.roleId === 2 // TODO admin roleId and send the user with role name from backend
                          ? ROUTES_CURRENT_ADMIN
                          : ROUTES_CURRENT_CUSTOMER
                      }
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <div className={styles.logoutIconContainer}>
                      <LogoutButton
                        navigate={navigate}
                        setIsLoggedIn={setIsLoggedIn}
                        setUserEmail={setUserEmail}
                        setUser={setUser}
                      />
                    </div>
                  </div>
                ) : (
                  <Link className={styles.linkChild} to={ROUTES_LOGIN}>
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                )}

                <div className={styles.cartAndQuantity}>
                  <Link className={styles.linkChild} to={ROUTES_CART}>
                    <FontAwesomeIcon icon={faCartShopping} />
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
