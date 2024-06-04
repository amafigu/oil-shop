import { ProductCard } from "#components/products/ProductCard"
import { useProductContext } from "#context/productContext"
import { useProductCategory } from "#hooks/useProductCategory"
import { useEffect, useState } from "react"
import styles from "./sortedProductsList.module.scss"

export const SortedProductsList = () => {
  const [productsList, setProductsList] = useState([])
  const { products } = useProductContext()
  const { sortCategory, categories } = useProductCategory()

  useEffect(() => {
    const sortByCategory = (products, category) => {
      const categoryNames = categories.map((category) => category.name)
      if (categoryNames.includes(category)) {
        return products.filter(
          (product) => category && product.category.name === category,
        )
      } else {
        return products
      }
    }
    setProductsList(sortByCategory(products, sortCategory))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, sortCategory])

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
