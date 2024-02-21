import NotificationCard from "#components/NotificationCard"
import { useProductDetails } from "#hooks/useProductDetails"
import React, { useEffect, useState } from "react"
import { ProductDetailsCard } from "../components/products/ProductDetailsCard"
import styles from "./productDetails.module.scss"

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const { product, notification } = useProductDetails()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.productDetailsPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.productDetailsPage}>
        {product && (
          <ProductDetailsCard
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDetails
