import { useProductContext } from "#context/productContext"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { searchProducts } from "#utils/searchProducts"
import styles from "./searchBar.module.scss"

export const SearchBar = ({
  searchProductText,
  setSearchProductText,
  setMatchedProducts,
  setShowMatchedProductsList,
}) => {
  const { products } = useProductContext()
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
