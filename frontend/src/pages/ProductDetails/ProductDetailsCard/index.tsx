import { ActionButton } from "@/components/ui/ActionButton"
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media"
import { SHOP } from "@/constants/routes"
import { STYLES } from "@/constants/styles"
import { useCart } from "@/hooks/useCart"
import { useProductCategory } from "@/hooks/useProductCategory"
import { useProductDetails } from "@/hooks/useProductDetails"
import { useTranslation } from "@/hooks/useTranslation"
import { setDefaultImageByError } from "@/utils/setDefaultImageByError"
import { titleCase } from "@/utils/titleCase"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./productDetailsCard.module.scss"

export const ProductDetailsCard: FC = () => {
  const { product, quantity } = useProductDetails()
  const { addProduct } = useCart()
  const { components } = useTranslation()
  const { setSortCategory } = useProductCategory()
  const text = components.productDetailsCard

  return (
    <>
      {product && (
        <article className={styles.card}>
          <section className={styles.body}>
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={product.image}
                alt={product.name}
                onError={(e) =>
                  setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                }
              />
            </div>
            <div className={styles.data}>
              <ul className={styles.list}>
                <li className={`${styles.listItem} ${styles.nameContainer}`}>
                  <span className={styles.name}>
                    {titleCase(product.name, " ")}
                  </span>
                </li>
                <li className={styles.listItem}>
                  <Link
                    to={SHOP}
                    onClick={() => setSortCategory(product.category?.name)}
                  >
                    <span className={styles.categoryLink}>
                      {titleCase(product.category?.name ?? "", " ")}
                    </span>
                  </Link>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.price}>{product.price} €</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.size}>
                    {text.quantity}: {product.size} ml
                  </span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.priceInfo}>{text.priceInfo}</span>
                </li>
                <div className={styles.separator} role='separator'></div>
                <li
                  className={`${styles.listItem} ${styles.descriptionContainer}`}
                >
                  <div>
                    <span className={styles.description}>
                      {product.details}
                    </span>
                  </div>
                  <div>
                    <span className={styles.description}>
                      {product.description}
                    </span>
                  </div>
                </li>
              </ul>
              <div className={styles.buttonContainer}>
                <ActionButton
                  action={() => addProduct(product, quantity)}
                  className={STYLES.BUTTONS.ADD_PRODUCT}
                  text={components.addOneToCartButton.text}
                />
              </div>
            </div>
          </section>
        </article>
      )}
    </>
  )
}
