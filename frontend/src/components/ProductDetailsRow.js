import styles from "./ProductDetailsRow.module.css"

function ProductDetailsRow({ product }) {
  return (
    <div className={styles.productDetailsRowWrapper}>
      <div className={styles.cartItemContainer} key={index}>
        <div className={styles.cartItem}>
          <div className={styles.imagesAndDetails}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <h3>{titleCase(product.name, "_")}</h3>
              <p>{product.description}</p>
              <p>{product.size} ml</p>
              <p>{product.quanty}</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ProductDetailsRow
