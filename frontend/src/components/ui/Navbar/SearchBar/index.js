import { useGetProducts } from "#hooks/useGetProducts"
import { searchProducts } from "#utils/products/searchProducts"
import styles from "./searchBar.module.scss"

export const SearchBar = ({
  searchProductText,
  setSearchProductText,
  setMatchedProducts,
  setShowMatchedProductsList,
}) => {
  const { products } = useGetProducts()

  return (
    <section className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchTextInput}
          onChange={(e) =>
            searchProducts(
              e,
              products,
              setSearchProductText,
              setMatchedProducts,
              setShowMatchedProductsList,
            )
          }
          placeholder='Search Product'
          value={searchProductText}
        />
        {/* <FontAwesomeIcon icon={getIconByName("faSearch")} /> */}
      </div>
    </section>
  )
}
