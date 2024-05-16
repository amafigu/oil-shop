import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/titleCase"
import styles from "./orderCard.module.scss"

export const OrderCard = ({ product, quantity }) => {
  const { components } = useTranslation()
  const text = components.orderCard
  return (
    <article
      className={styles.card}
      aria-label={`${text.orderedProduct}: ${product.name}`}
    >
      {product ? (
        <dl>
          <div className={styles.bodyWrapper}>
            <div className={styles.body}>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                  onError={(e) =>
                    setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                  }
                />
              </div>

              <div className={styles.description}>
                <dt className={styles.hideForSemantics}>
                  {text.hiddenSemantics}
                </dt>
                <dd>{`${quantity} ${titleCase(product.name, "_")} ${
                  product.size
                } ml`}</dd>
                <dd>{product.description}</dd>
                <dd></dd>
                <dd>{`${product.price} € ${text.pricePerUnit}`} </dd>
              </div>
            </div>
            <hr />
          </div>
        </dl>
      ) : (
        <p>{text.productNotFound}</p>
      )}
    </article>
  )
}
