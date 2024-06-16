import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import { ProductDetailsCard } from "./ProductDetailsCard"
import styles from "./productDetails.module.scss"

export const ProductDetails: FC = () => {
  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='Product details page'>
      <section className={styles.container}>
        <ProductDetailsCard />
      </section>
    </main>
  )
}
