import ProductCard from "#components/ProductCard"
import { PRODUCT_SLIDER_QUANTITY } from "#utils/constants"
import { useGetProducts } from "#utils/utils"
import React, { useState } from "react"
import styles from "./productSlider.module.scss"

const ProductSlider = () => {
  const [products, setProducts] = useState([])
  const [currentProductIndex, setcurrentProductIndex] = useState(0)

  useGetProducts(setProducts)

  const nextProduct = () => {
    const newIndex = currentProductIndex + 1
    setcurrentProductIndex(
      newIndex >= products.length - PRODUCT_SLIDER_QUANTITY + 1 ? 0 : newIndex,
    )
  }

  const previousProduct = () => {
    const newIndex = currentProductIndex - 1
    setcurrentProductIndex(
      newIndex < 0 ? products.length - PRODUCT_SLIDER_QUANTITY : newIndex,
    )
  }

  return (
    <div className={styles.slider}>
      <button
        className={`material-symbols-outlined ${styles.iconSlider}`}
        onClick={previousProduct}
      >
        arrow_back_ios
      </button>
      {products
        .slice(
          currentProductIndex,
          currentProductIndex + PRODUCT_SLIDER_QUANTITY,
        )
        .map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.image}
            size={product.size}
            price={product.price}
            description={product.description}
          />
        ))}
      <button
        onClick={nextProduct}
        className={`material-symbols-outlined ${styles.iconSlider}`}
      >
        arrow_forward_ios
      </button>
    </div>
  )
}

export default ProductSlider
