import { DEFAULT_PRODUCT_IMAGE } from "#utils/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import styles from "./productDetailsRow.module.scss"

const ProductDetailsRow = ({ product, quantity }) => {
  return (
    <div className={styles.productDetailsRowWrapper}>
      {product ? (
        <div>
          <div className={styles.itemContainer}>
            <div className={styles.imagesAndDetails}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.itemImage}
                onError={(e) =>
                  setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                }
              />
              <div className={styles.itemDetails}>
                <h3>
                  {quantity} X {titleCase(product.name, "_")}
                </h3>
                <p>{product.description}</p>
                <p>{product.size} ml</p>
                <p>{product.price} € Pro Unit</p>
              </div>
            </div>

            <hr />
          </div>
        </div>
      ) : (
        <div>Product not found {quantity}</div>
      )}
    </div>
  )
}

export default ProductDetailsRow
