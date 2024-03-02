import { ProductCard } from "#components/products/ProductCard"
import { useGetProducts } from "#hooks/useGetProducts"
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import styles from "./productSlider.module.scss"

export const ProductsSlider = () => {
  const [currentProductIndex, setcurrentProductIndex] = useState(0)
  const [sliderQuantity, setSliderQuantity] = useState(1)
  const { products } = useGetProducts()

  const updateSliderQuantityByScreenSize = () => {
    let windowSize = window.innerWidth
    if (windowSize >= 1300) {
      setSliderQuantity(4)
    }
    if (windowSize <= 1299) {
      setSliderQuantity(3)
    }
    if (windowSize <= 970) {
      setSliderQuantity(2)
    }
    if (windowSize <= 600) {
      setSliderQuantity(1)
    }
  }

  useEffect(() => {
    updateSliderQuantityByScreenSize()
    window.addEventListener("resize", updateSliderQuantityByScreenSize)
    return () =>
      window.removeEventListener("resize", updateSliderQuantityByScreenSize)
  }, [])

  const nextProduct = () => {
    const newIndex = currentProductIndex + 1
    setcurrentProductIndex(
      newIndex >= products.length - sliderQuantity + 1 ? 0 : newIndex,
    )
  }

  const previousProduct = () => {
    const newIndex = currentProductIndex - 1
    setcurrentProductIndex(
      newIndex < 0 ? products.length - sliderQuantity : newIndex,
    )
  }

  return (
    <div className={styles.productSliderWrapper}>
      <button className={styles.iconSlider} onClick={previousProduct}>
        <FontAwesomeIcon icon={getIconByName("faChevronLeft")} size='2xl' />
      </button>
      {products
        .slice(currentProductIndex, currentProductIndex + sliderQuantity)
        .map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      <button onClick={nextProduct} className={styles.iconSlider}>
        <FontAwesomeIcon icon={getIconByName("faChevronRight")} size='2xl' />
      </button>
    </div>
  )
}
