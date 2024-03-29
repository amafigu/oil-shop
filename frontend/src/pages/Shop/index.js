import { NavigationMenu } from "#components/ui/NavigationMenu"
import { ROUTES_SHOP } from "#constants/routes"
import { STYLES } from "#constants/styles"
import { useGetProductCategories } from "#hooks/useGetProductCategories"
import { scrollToTop } from "#utils/scrollToTop"
import { SortedProductsList } from "./SortedProductsList"
import styles from "./shop.module.scss"

export const Shop = () => {
  const { productCategories } = useGetProductCategories()
  scrollToTop()

  return (
    <main className={styles.shopPageWrapper}>
      <div className={styles.navigationMenuContainer}>
        <NavigationMenu
          items={
            productCategories &&
            productCategories.map((category) => ({
              type: "category",
              path: `${ROUTES_SHOP}?category=${category.name}`,
              label: category.name,
            }))
          }
          className={STYLES.COMPONENTS.NAVIGATION_MENU.PRODUCT_CATEGORIES}
        />
      </div>
      <div className={styles.shopPage}>
        <section className={styles.sortedProductsSection}>
          <SortedProductsList />
        </section>
      </div>
    </main>
  )
}
