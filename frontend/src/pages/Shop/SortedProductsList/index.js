import { ProductCard } from "#components/products/ProductCard"
import { useProductCategoryByUrlQuery } from "#hooks/useProductCategoryByUrlQuery"
import { useProducts } from "#hooks/useProducts"
import styles from "./sortedProductsList.module.scss"

const filteredProducts = (products, category) =>
  category
    ? products.filter((product) => product.category.name === category)
    : products

export const SortedProductsList = () => {
  const { products } = useProducts()
  const { category } = useProductCategoryByUrlQuery()
  const sortedProducts = filteredProducts(products, category)

  return (
    <ul className={styles.container} aria-label='products list'>
      {sortedProducts.map((product) => (
        <li key={product.id} aria-label='products list item'>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
