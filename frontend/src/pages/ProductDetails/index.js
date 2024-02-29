import NotificationCard from "#components/ui/NotificationCard"
import { useProductDetails } from "#hooks/useProductDetails"
import { scrollToTop } from "#utils/render"
import { ProductDetailsCard } from "./ProductDetailsCard"
import styles from "./productDetails.module.scss"

export const ProductDetails = () => {
  const { product, notification, quantity, setQuantity } = useProductDetails()
  scrollToTop()

  return (
    <main
      className={styles.productDetailsPageWrapper}
      aria-label='Product details page'
    >
      {notification && <NotificationCard message={notification} />}
      <section className={styles.productDetailsPage}>
        {product && (
          <ProductDetailsCard
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        )}
      </section>
    </main>
  )
}
