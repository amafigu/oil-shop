import { ProductCard } from "#components/products/ProductCard"
import { useGetProducts } from "#hooks/useGetProducts"
import { filteredProducts } from "#utils/products"
import styles from "./sortedProductsList.module.scss"

export const SortedProductsList = ({ category }) => {
  const { products } = useGetProducts()
  const sortedProducts = filteredProducts(products, category)

  return (
    <ul className={styles.sortedProductsList} aria-label='products list'>
      {sortedProducts.map((product) => (
        <li
          key={product.id}
          className={styles.sortedProduct}
          aria-label='products list item'
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
