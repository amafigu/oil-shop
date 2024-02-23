import { ProductsSlider } from "./ProductsSlider"
import { TeaserCards } from "./TeaserCards"
import { TeaserText } from "./TeaserText"
import { VideoBanner } from "./VideoBanner"
import styles from "./home.module.scss"

export const Home = () => {
  return (
    <div className={styles.homePageWrapper}>
      <div className={styles.homePage}>
        <div className={styles.pageColumn}>
          <section className={styles.videoBannerContainer}>
            <VideoBanner />
          </section>
          <TeaserText />
          <section className={styles.productSliderContainer}>
            <ProductsSlider />
          </section>
          <section className={styles.columnsContainer}>
            <TeaserCards />
          </section>
        </div>
      </div>
    </div>
  )
}
