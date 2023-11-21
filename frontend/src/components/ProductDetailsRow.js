import { titleCase } from "#utils/utils"
import styles from "./productDetailsRow.module.scss"

const ProductDetailsRow = ({ product, quantity }) => {
  return (
    <div className={styles.productDetailsRowWrapper}>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <div className={styles.imagesAndDetails}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <h3>
                {quantity} {titleCase(product.name, "_")}
              </h3>
              <p>{product.description}</p>
              <p>{product.size} ml</p>
              <p>{product.price} € Pro Unit</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ProductDetailsRow
