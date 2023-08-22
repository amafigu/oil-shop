import { CartContext } from "#context/cartContext"
import { titleCase } from "#utils/utils"
import axios from "axios"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LanguageDropdown from "./LanguageDropdown"
import SubNavbar from "./SubNavbar"
import styles from "./navbar.module.scss"

const Navbar = ({ toggleSidebarMenuVisibility }) => {
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState([])
  const [slideInOutClass, setSlideInOutClass] = useState(
    isSearchDropdownOpen ? "visible" : "hidden",
  )
  const [matchedProducts, setMatchedProducts] = useState([])
  const { getAllProductsQuantity } = useContext(CartContext)

  const navigate = useNavigate()

  const searchProductListDropdownRef = useRef(null)

  useEffect(() => {
    if (isSearchDropdownOpen) {
      setSlideInOutClass("visible")
    } else {
      setSlideInOutClass("hidden")
    }
  }, [isSearchDropdownOpen])

  useEffect(() => {
    const listenClickOutsideSearchProductListDropdown = (event) => {
      if (
        searchProductListDropdownRef.current &&
        !searchProductListDropdownRef.current.contains(event.target)
      ) {
        setSearchDropdownOpen(false)
        setMatchedProducts([])
      }
    }
    document.addEventListener(
      "mousedown",
      listenClickOutsideSearchProductListDropdown,
    )
    return () => {
      document.removeEventListener(
        "mousedown",
        listenClickOutsideSearchProductListDropdown,
      )
    }
  }, [])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((e) => console.error("Error getting products data", e))
  }, [])

  const getInputChange = (e) => {
    setSearchText(e.target.value)
    setSearchDropdownOpen(true)

    const match = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setMatchedProducts(match.slice(0, 6))
    if (e.target.value === "") {
      setMatchedProducts([])
      setSearchText("")
    }
  }

  const navigateToProduct = (name) => {
    navigate(`/products/${name}`)
    setSearchDropdownOpen(false)
    setMatchedProducts([])
    setSearchText("")
  }

  const getPressedKey = (e) => {
    if (e.key === "Enter") {
      searchProduct()
    }
  }

  const searchProduct = () => {
    const match = products.find(
      (product) => product.name.toLowerCase() === searchText.toLowerCase(),
    )
    if (match) {
      navigate(`/products/${match.name}`)
    } else {
      console.error("not able to navigate to product page ")
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarColumn}>
            <span
              className={`${styles.toggleSidebarButton} material-symbols-outlined`}
              onClick={() => {
                toggleSidebarMenuVisibility()
              }}
            >
              menu
            </span>
          </div>
          <div className={styles.navbarColumn}>
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt='logo'
            />
          </div>

          <div className={styles.navbarColumn}>
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

            <div
              className={`${styles.inputIconContainer} ${styles[slideInOutClass]}`}
            >
              <div
                className={styles.searchTextInputAndProductList}
                ref={searchProductListDropdownRef}
              >
                <input
                  className={styles.searchTextInput}
                  onChange={getInputChange}
                  onKeyDown={getPressedKey}
                  placeholder='Search Product'
                  value={searchText}
                ></input>
                {isSearchDropdownOpen && matchedProducts.length > 0 && (
                  <div
                    className={
                      isSearchDropdownOpen
                        ? styles.searchDropdown
                        : styles.hidden
                    }
                  >
                    {matchedProducts.map((product) => (
                      <div
                        className={styles.dropdownListItem}
                        key={product.name}
                        onClick={() => navigateToProduct(product.name)}
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
                )}
              </div>
            </div>
            <div className={styles.gap}></div>
            <nav className={styles.iconsNav}>
              <LanguageDropdown />
              <div className={styles.account}>
                <span className='material-symbols-outlined'>
                  account_circle
                </span>
              </div>

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
