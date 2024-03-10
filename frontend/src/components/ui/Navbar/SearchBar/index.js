import { getIconByName } from "#utils/icons"
import { getInputChangeAndOpenList } from "#utils/render"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProductsDropdown from "../ProductsDropdown"
import styles from "./searchBar.module.scss"
export const SearchBar = ({
  products,
  showProductsSearchbar,
  setShowProductsSearchbar,
  searchProductText,
  setSearchProductText,
  setSearchDropdownOpen,
  setMatchedProducts,
  matchedProducts,
  searchProductListDropdownRef,
  getPressedEnterKeyInSearchField,
  isSearchDropdownOpen,
}) => {
  return (
    <section className={styles.searchBar}>
      <div
        className={
          showProductsSearchbar
            ? styles.searchTextInputAndProductList
            : styles.hidden
        }
      >
        <div className={styles.searchTextInputAndIcon}>
          <input
            className={styles.searchTextInput}
            onChange={getInputChangeAndOpenList(
              products,
              setSearchProductText,
              setSearchDropdownOpen,
              setMatchedProducts,
            )}
            onKeyDown={getPressedEnterKeyInSearchField}
            placeholder='Search Product'
            value={searchProductText}
          ></input>
          <div
            className={styles.searchIconIWrapperOut}
            onClick={() => {
              setShowProductsSearchbar(false)
              setSearchProductText("")
            }}
          >
            <FontAwesomeIcon icon={getIconByName("faSearch")} />
          </div>
        </div>

        {matchedProducts.length > 0 && isSearchDropdownOpen && (
          <>
            <div
              className={styles.searchDropdown}
              ref={searchProductListDropdownRef}
            >
              <ProductsDropdown
                setShowProductsSearchbar={setShowProductsSearchbar}
                setSearchProductText={setSearchProductText}
                setMatchedProducts={setMatchedProducts}
                matchedProducts={matchedProducts}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
