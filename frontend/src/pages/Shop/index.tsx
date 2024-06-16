import { CategoryMenu } from "@/components/ui/CategoryMenu"
import { FC } from "react"
import { SortedProductsList } from "./SortedProductsList"
import styles from "./shop.module.scss"

export const Shop: FC = () => (
  <main className={styles.wrapper} aria-label='Shop page'>
    <div className={styles.menuContainer}>
      <CategoryMenu />
    </div>
    <section className={styles.productsSection}>
      <div className={styles.listContainer}>
        <SortedProductsList />
      </div>
    </section>
  </main>
)
