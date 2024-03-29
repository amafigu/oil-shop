import { useGetProducts } from "#hooks/useGetProducts"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { searchProducts } from "#utils/searchProducts"
import styles from "./searchBar.module.scss"

export const SearchBar = ({
  searchProductText,
  setSearchProductText,
  setMatchedProducts,
  setShowMatchedProductsList,
}) => {
  const { products } = useGetProducts()
  const { showProductsSearchBar } = useMenuOptions()

  return (
    <section className={styles.searchBar}>
      <div
        className={
          showProductsSearchBar
            ? `${styles.inputContainer} ${styles.showBar}`
            : `${styles.hideBar}`
        }
      >
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
      </div>
    </section>
  )
}
