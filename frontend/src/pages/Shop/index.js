import { CategoryMenu } from "#components/ui/CategoryMenu"
import { SortedProductsList } from "./SortedProductsList"
import styles from "./shop.module.scss"

export const Shop = () => (
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
