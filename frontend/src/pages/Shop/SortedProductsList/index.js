import { ProductCard } from "#components/products/ProductCard"
import { useProductCategoryByUrlQuery } from "#hooks/useProductCategoryByUrlQuery"
import { useProducts } from "#hooks/useProducts"
import { useEffect, useState } from "react"
import styles from "./sortedProductsList.module.scss"

export const SortedProductsList = () => {
  const [productsList, setProductsList] = useState([])
  const { products } = useProducts()
  const { category } = useProductCategoryByUrlQuery()

  useEffect(() => {
    const filteredProducts = (products, category) => {
      if (category) {
        return products.filter(
          (product) => category && product.product_category.name === category,
        )
      } else {
        return products
      }
    }
    setProductsList(filteredProducts(products, category))
  }, [products, category])

  return (
    <ul className={styles.container} aria-label='products list'>
      {productsList &&
        productsList.map((product) => (
          <li key={product.id} aria-label='products list item'>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  )
}
