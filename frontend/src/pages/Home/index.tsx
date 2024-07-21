import { useProductContext } from "@/context/productContext"
import { FC } from "react"
import { Banner } from "./Banner"
import { Carousel } from "./Carousel"
import { TeaserText } from "./TeaserText"
import styles from "./home.module.scss"

export const Home: FC = () => {
  const { products } = useProductContext()
  return (
    <main className={styles.wrapper} aria-label='home page'>
      <div className={styles.container}>
        <div className={styles.column}>
          <section className={styles.banner}>
            <Banner />
          </section>
          <TeaserText />
          <section className={styles.slider}>
            <Carousel items={products} />
          </section>
        </div>
      </div>
    </main>
  )
}
