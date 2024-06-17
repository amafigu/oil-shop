import { useProductContext } from "@/context/productContext"
import { useMenuOptions } from "@/hooks/useMenuOptions"
import { Product } from "@/types/Product"
import { searchProducts } from "@/utils/searchProducts"
import { Dispatch, SetStateAction } from "react"
import styles from "./searchBar.module.scss"

interface SearchBarProps {
  searchProductText: string
  setSearchProductText: Dispatch<SetStateAction<string>>
  setMatchedProducts: Dispatch<SetStateAction<Product[]>>
  setShowMatchedProductsList: Dispatch<SetStateAction<boolean>>
}

export const SearchBar = ({
  searchProductText,
  setSearchProductText,
  setMatchedProducts,
  setShowMatchedProductsList,
}: SearchBarProps) => {
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
          id={"searchbar-input"}
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
