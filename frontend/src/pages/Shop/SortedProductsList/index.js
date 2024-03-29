import { ProductCard } from "#components/products/ProductCard"
import { useGetProducts } from "#hooks/useGetProducts"
import { useProductCategoryByUrlQuery } from "#hooks/useProductCategoryByUrlQuery"
import styles from "./sortedProductsList.module.scss"

const filteredProducts = (products, category) =>
  products.filter(
    (product) => product.category.name === category || category === "all",
  )

export const SortedProductsList = () => {
  const { products } = useGetProducts()
  const { category } = useProductCategoryByUrlQuery()
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
