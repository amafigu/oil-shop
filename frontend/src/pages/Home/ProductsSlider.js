import ProductCard from "#components/ProductCard"
import axios from "axios"
import React, { useEffect, useState } from "react"
import styles from "./productSlider.module.scss"

const ProductSlider = () => {
  const [products, setProducts] = useState([])
  const [currentProductIndex, setcurrentProductIndex] = useState(0)
  const displayCount = 4

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        console.log(response.data)
        setProducts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [])

  const nextProduct = () => {
    const newIndex = currentProductIndex + 1
    setcurrentProductIndex(
      newIndex >= products.length - displayCount + 1 ? 0 : newIndex,
    )
  }

  const previousProduct = () => {
    const newIndex = currentProductIndex - 1
    setcurrentProductIndex(
      newIndex < 0 ? products.length - displayCount : newIndex,
    )
  }

  return (
    <div className={styles.carousel}>
      <span
        className={`material-symbols-outlined ${styles.iconCarousel}`}
        onClick={previousProduct}
      >
        arrow_back_ios
      </span>
      {products
        .slice(currentProductIndex, currentProductIndex + displayCount)
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
      <span
        onClick={nextProduct}
        className={`material-symbols-outlined ${styles.iconCarousel}`}
      >
        arrow_forward_ios
      </span>
    </div>
  )
}

export default ProductSlider
