import { NavigationMenu } from "#components/ui/NavigationMenu"
import { ROUTES_SHOP } from "#constants/routes"
import { useGetProductCategories } from "#hooks/useGetProductCategories"
import { scrollToTop } from "#utils/render"
import { SortedProductsList } from "./SortedProductsList"
import styles from "./shop.module.scss"

export const Shop = () => {
  const { productCategories } = useGetProductCategories()
  scrollToTop()

  return (
    <main className={styles.shopPageWrapper}>
      <div className={styles.shopPage}>
        <nav className={styles.sidebarWrapper}>
          <NavigationMenu
            items={
              productCategories &&
              productCategories.map((category) => ({
                type: "category",
                path: `${ROUTES_SHOP}?category=${category.name}`,
                label: category.name,
              }))
            }
            navigationProperty={"name"}
          />
        </nav>
        <section className={styles.sortedProductsSection}>
          <SortedProductsList />
        </section>
      </div>
    </main>
  )
}
