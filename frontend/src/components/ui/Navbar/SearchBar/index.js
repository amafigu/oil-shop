import { useMenuOptions } from "#hooks/useMenuOptions"
import { useProducts } from "#hooks/useProducts"
import { searchProducts } from "#utils/searchProducts"
import styles from "./searchBar.module.scss"

export const SearchBar = ({
  searchProductText,
  setSearchProductText,
  setMatchedProducts,
  setShowMatchedProductsList,
}) => {
  const { products } = useProducts()
  const { showProductsSearchBar } = useMenuOptions()

  return (
    <section className={styles.wrapper}>
      <div
        className={
          showProductsSearchBar
            ? `${styles.container} ${styles.show}`
            : `${styles.hide}`
        }
      >
        <input
          className={styles.input}
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
