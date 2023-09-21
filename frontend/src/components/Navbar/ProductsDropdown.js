import {
  getInputChangeAndOpenList,
  navigateToProductAndCloseDropdown,
  searchAndNavigateToProduct,
  titleCase,
} from "#utils/utils"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { React } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./productsDropdown.module.scss"

const ProductsDropdown = ({
  isProductDropdownVisible,
  setProductDropdownVisible,
  products,
  setSearchText,
  setSearchDropdownOpen,
  setMatchedProducts,
  matchedProducts,
  searchProductListDropdownRef,
  isSearchDropdownOpen,
  searchText,
}) => {
  const navigate = useNavigate()

  const getPressedEnterKeyInSearchField = (e) => {
    if (e.key === "Enter") {
      searchAndNavigateToProduct(products, searchText, navigate)
    }
  }

  return (
    <div className={styles.productsDropdownWrapper}>
      <div className={styles.searchProduct}>
        <div
          className={
            isProductDropdownVisible
              ? styles.searchTextInputAndProductList
              : styles.hidden
          }
        >
          <div
            className={styles.searchAndDropdownContainer}
            style={
              isSearchDropdownOpen
                ? {
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }
                : {
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }
            }
          >
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
            />
            <div
              className={
                isProductDropdownVisible ? styles.searchIcon : styles.hidden
              }
              onClick={() => {
                setMatchedProducts([])
                setSearchText("")
                setProductDropdownVisible(
                  (prevIsProductDropdownVisible) =>
                    !prevIsProductDropdownVisible,
                )
              }}
            >
              <FontAwesomeIcon icon={faSearch} size={"xl"} />
            </div>
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
    </div>
  )
}

export default ProductsDropdown
