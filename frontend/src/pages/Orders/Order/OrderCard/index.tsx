import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media"
import { useTranslation } from "@/hooks/useTranslation"
import { setDefaultImageByError } from "@/utils/setDefaultImageByError"
import { titleCase } from "@/utils/titleCase"
import { FC } from "react"
import styles from "./orderCard.module.scss"

interface OrderCardProps {
  product:
    | {
        name: string
        image?: string
        size: string
        description?: string
        price?: number
      }
    | undefined
  quantity: number
}

export const OrderCard: FC<OrderCardProps> = ({ product, quantity }) => {
  const { components } = useTranslation()
  const text = components.orderCard

  return (
    <article
      className={styles.wrapper}
      aria-label={`${text.orderedProduct}: ${product?.name}`}
    >
      {product ? (
        <div className={styles.container}>
          <div className={styles.body}>
            <div className={styles.imageContainer}>
              <img
                src={product.image || DEFAULT_PRODUCT_IMAGE}
                alt={product.name}
                className={styles.image}
                onError={(e) =>
                  setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                }
              />
            </div>
            <div className={styles.description}>
              <div>{`${quantity} ${titleCase(product.name, "_")} ${
                product.size
              } ml`}</div>
              <div>{`${product.price} € ${text.pricePerUnit}`}</div>
            </div>
          </div>
          <hr />
        </div>
      ) : (
        <p>{text.productNotFound}</p>
      )}
    </article>
  )
}
