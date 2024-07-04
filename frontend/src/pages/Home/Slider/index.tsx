import { ProductCard } from "@/components/products/ProductCard"
import { ActionButton } from "@/components/ui/ActionButton"
import { STYLES } from "@/constants/styles"
import { Product } from "@/types/Product"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect, useState } from "react"
import styles from "./slider.module.scss"

interface SliderProps {
  items: Product[]
}

export const Slider: FC<SliderProps> = ({ items }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [sliderQuantity, setSliderQuantity] = useState(1)

  const updateSliderQuantityByScreenSize = () => {
    const windowSize = window.innerWidth
    if (windowSize >= 1761) {
      setSliderQuantity(4)
    }
    if (windowSize <= 1760) {
      setSliderQuantity(3)
    }
    if (windowSize <= 1359) {
      setSliderQuantity(2)
    }
    if (windowSize <= 840) {
      setSliderQuantity(1)
    }
  }

  useEffect(() => {
    updateSliderQuantityByScreenSize()
    window.addEventListener("resize", updateSliderQuantityByScreenSize)
    return () =>
      window.removeEventListener("resize", updateSliderQuantityByScreenSize)
  }, [])

  const nextItem = () => {
    const newIndex = currentItemIndex + 1
    setCurrentItemIndex(
      newIndex >= items.length - sliderQuantity + 1 ? 0 : newIndex,
    )
  }

  const previousItem = () => {
    const newIndex = currentItemIndex - 1
    setCurrentItemIndex(newIndex < 0 ? items.length - sliderQuantity : newIndex)
  }

  return (
    <section className={styles.container} aria-label='product slider'>
      <ActionButton
        action={previousItem}
        text={
          <FontAwesomeIcon icon={getIconByName("faChevronLeft")} size='2xl' />
        }
        className={STYLES.BUTTONS.SLIDER}
        ariaLabel='previous item'
      />
      <ul className={styles.list} aria-label='slider items list'>
        {items &&
          items.length > 0 &&
          items
            .slice(currentItemIndex, currentItemIndex + sliderQuantity)
            .map((product, index) => (
              <li aria-label='slider item' key={index}>
                <ProductCard product={product} />
              </li>
            ))}
      </ul>
      <ActionButton
        action={nextItem}
        text={
          <FontAwesomeIcon icon={getIconByName("faChevronRight")} size='2xl' />
        }
        className={STYLES.BUTTONS.SLIDER}
        ariaLabel='next item'
      />
    </section>
  )
}
