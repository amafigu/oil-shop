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
  isMobileProductDropdownVisible,
  setMobileProductDropdownVisible,
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

  console.log(isMobileProductDropdownVisible)
  return (
    <div className={styles.productsDropdownWrapper}>
      <div className={styles.searchProduct}>
        <div
          className={
            isMobileProductDropdownVisible
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
        className={
          isMobileProductDropdownVisible ? styles.searchIcon : styles.hidden
        }
        onClick={() => {
          setMatchedProducts([])
          setSearchText("")
          setMobileProductDropdownVisible(
            (prevIsMobileProductDropdownVisible) =>
              !prevIsMobileProductDropdownVisible,
          )
        }}
      >
        <FontAwesomeIcon icon={faSearch} size={"xl"} />
      </div>
    </div>
  )
}

export default ProductsDropdown
