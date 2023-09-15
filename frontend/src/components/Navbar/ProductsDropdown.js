import {
  getInputChangeAndOpenList,
  navigateToProductAndCloseDropdown,
  searchAndNavigateToProduct,
  titleCase,
} from "#utils/utils"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./productsDropdown.module.scss"

const ProductsDropdown = ({
  products,
  setSearchText,
  setSearchDropdownOpen,
  setMatchedProducts,
  matchedProducts,
  searchProductListDropdownRef,
  isSearchDropdownOpen,
  searchText,
}) => {
  const [isInputVisible, setInputVisible] = useState(false)
  const navigate = useNavigate()

  const getPressedEnterKeyInSearchField = (e) => {
    if (e.key === "Enter") {
      searchAndNavigateToProduct(products, searchText, navigate)
    }
  }
  return (
    <div className={styles.productsDropdownWrapper}>
      <div className={`${styles.searchProduct}`}>
        <div
          className={
            isInputVisible
              ? styles.searchTextInputAndProductList
              : styles.hidden
          }
        >
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

          {matchedProducts.length > 0 && isSearchDropdownOpen && (
            <>
              <div className={styles.dropdownModal}></div>
              <div
                ref={searchProductListDropdownRef}
                className={styles.dropdownList}
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
                          process.env.PUBLIC_URL + "/assets/" + product.image
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
      <div
        className={styles.searchIcon}
        onClick={() => {
          setSearchDropdownOpen(
            (prevIsSearchDropdownOpen) => !prevIsSearchDropdownOpen,
          )
          setMatchedProducts([])
          setSearchText("")
          setInputVisible((prevIsInputVisible) => !prevIsInputVisible)
        }}
      >
        <FontAwesomeIcon icon={faSearch} size={"xl"} />
      </div>
    </div>
  )
}

export default ProductsDropdown
