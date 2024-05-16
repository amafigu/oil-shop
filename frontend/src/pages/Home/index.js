import { useProducts } from "#hooks/useProducts"
import { Banner } from "./Banner"
import { Slider } from "./Slider"
import { TeaserCards } from "./TeaserCards"
import { TeaserText } from "./TeaserText"
import styles from "./home.module.scss"

export const Home = () => {
  const { products } = useProducts()
  return (
    <main className={styles.homePageWrapper} aria-label='home page'>
      <div className={styles.homePage}>
        <div className={styles.pageColumn}>
          <section className={styles.videoBannerContainer}>
            <Banner />
          </section>
          <TeaserText />
          <section className={styles.productSliderContainer}>
            <Slider items={products} />
          </section>
          <section className={styles.columnsContainer}>
            <TeaserCards />
          </section>
        </div>
      </div>
    </main>
  )
}
