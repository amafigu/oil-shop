import { useTranslation } from "#hooks/useTranslation"
import { React } from "react"
import { Carousel } from "./Carousel"
import { ProductsSlider } from "./ProductsSlider"
import { TeaserCards } from "./TeaserCards"
import { TeaserText } from "./TeaserText"
import styles from "./home.module.scss"

export const Home = () => {
  const translate = useTranslation()
  return (
    <div className={styles.homePageWrapper}>
      <div className={styles.homePage}>
        <div className={styles.pageColumn}>
          <section className={styles.carouselContainer}>
            <Carousel />
          </section>
          <TeaserText />
          <section className={styles.productSliderContainer}>
            <ProductsSlider />
          </section>
          <section className={styles.columnsContainer}>
            <TeaserCards translate={translate} />
          </section>
        </div>
      </div>
    </div>
  )
}
