import { CategoryMenu } from "#components/ui/CategoryMenu"
import { SortedProductsList } from "./SortedProductsList"
import styles from "./shop.module.scss"

export const Shop = () => (
  <main className={styles.wrapper} aria-label='Shop page'>
    <div className={styles.container}>
      <CategoryMenu />
    </div>
    <div className={styles.products}>
      <section className={styles.list}>
        <SortedProductsList />
      </section>
    </div>
  </main>
)
