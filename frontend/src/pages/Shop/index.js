import Sidebar from "#components/ui/Sidebar"
import { useProductCategoryByUrlQuery } from "#hooks/useProductCategoryByUrlQuery"
import { scrollToTop } from "#utils/render"
import React from "react"
import { SortedProductsList } from "./SortedProductsList"
import styles from "./shop.module.scss"

export const Shop = ({ productCategories }) => {
  const { category, setCategory } = useProductCategoryByUrlQuery()
  scrollToTop()

  return (
    <main className={styles.shopPageWrapper}>
      <div className={styles.shopPage}>
        <nav className={styles.sidebarWrapper}>
          <Sidebar
            setCategory={setCategory}
            productCategories={productCategories}
          />
        </nav>
        <section className={styles.sortedProductsSection}>
          <SortedProductsList category={category} />
        </section>
      </div>
    </main>
  )
}
