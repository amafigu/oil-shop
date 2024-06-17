import { ProductCard } from "@/components/products/ProductCard"
import { useProductContext } from "@/context/productContext"
import { useProductCategory } from "@/hooks/useProductCategory"
import { Category, Product } from "@/types/Product"
import { FC, useEffect, useState } from "react"
import styles from "./sortedProductsList.module.scss"

export const SortedProductsList: FC = () => {
  const [productsList, setProductsList] = useState<Product[]>([])
  const { products } = useProductContext()
  const { sortCategory, categories } = useProductCategory()

  useEffect(() => {
    const sortByCategory = (
      products: Product[],
      category: string,
    ): Product[] => {
      const categoryNames = categories.map(
        (category: Category) => category.name,
      )
      if (categoryNames.includes(category)) {
        return products.filter(
          (product) =>
            category && product.category && product.category.name === category,
        )
      } else {
        return products
      }
    }

    if (sortCategory) {
      setProductsList(sortByCategory(products, sortCategory))
    } else {
      setProductsList(products)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, sortCategory])

  return (
    <ul className={styles.container} aria-label='products list'>
      {productsList &&
        productsList.map((product: Product) => (
          <li key={product.id} aria-label='products list item'>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  )
}
