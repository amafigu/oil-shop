import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/titleCase"
import styles from "./orderSummaryItem.module.scss"

export const OrderSummaryItem = ({ image, name, size, quantity }) => {
  const { translate } = useTranslation()
  const text = translate.components.orderSummaryItem.quantity

  return (
    <article className={styles.item} aria-label='ordered product'>
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={name}
          className={styles.image}
          onError={(e) => setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)}
        />
      </div>
      <div className={styles.details} aria-label='product details'>
        <span>{titleCase(name, "_")}</span>
        <span>{size} ml</span>
        <span>
          {text}: {quantity}
        </span>
      </div>
    </article>
  )
}
