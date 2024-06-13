import { scrollToTop } from "#utils/scrollToTop"
import { ProductDetailsCard } from "./ProductDetailsCard"
import styles from "./productDetails.module.scss"

export const ProductDetails = () => {
  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='Product details page'>
      <section className={styles.container}>
        <ProductDetailsCard />
      </section>
    </main>
  )
}
