import { ProductCard } from "#components/products/ProductCard"
import { useGetProducts } from "#hooks/useGetProducts"
import { filteredProducts } from "#utils/products"
import styles from "./sortedProductsList.module.scss"

export const SortedProductsList = ({ category }) => {
  const { products } = useGetProducts()
  const sortedProducts = filteredProducts(products, category)

  return (
    <ul aria-label='products list' className={styles.sortedProductsList}>
      {sortedProducts.map((product) => (
        <li key={product.id} className={styles.sortedProduct}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
