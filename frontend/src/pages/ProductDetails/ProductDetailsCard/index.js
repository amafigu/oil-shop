import { ActionButton } from "#components/ui/ActionButton"
import NotificationCard from "#components/ui/NotificationCard"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { ROUTES_SHOP_QUERY_CATEGORY_PREFIX } from "#constants/routes"
import { STYLES } from "#constants/styles"
import { useCart } from "#hooks/useCart"
import { useProductDetails } from "#hooks/useProductDetails"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/titleCase"
import { Link } from "react-router-dom"
import { Counter } from "./Counter"
import styles from "./productDetailsCard.module.scss"

export const ProductDetailsCard = () => {
  const { product, quantity, setQuantity, notification } = useProductDetails()
  const { addProduct } = useCart()
  const { components } = useTranslation()

  return (
    <>
      {notification && <NotificationCard message={notification} />}
      {product && (
        <article className={styles.card} aria-label={`${product.name} details`}>
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
            <div className={styles.container}>
              <ul className={styles.data}>
                <li
                  className={styles.category}
                  aria-label={`link to ${product.category.name} products`}
                >
                  <Link
                    className={styles.link}
                    to={`${ROUTES_SHOP_QUERY_CATEGORY_PREFIX}${product.category.name}`}
                  >
                    {titleCase(product.category.name, "_")}
                  </Link>
                </li>

                <li className={styles.name}>
                  {titleCase(product.name, "_")} {product.size} ml
                </li>
                <li className={styles.description}>{product.description}</li>
                <li className={styles.details}>{product.details}</li>
                <li className={styles.row}>
                  <span className={styles.size}>{product.size} ml</span>
                  <span className={styles.price}>${product.price}</span>
                </li>
              </ul>
              <div className={styles.selection}>
                <Counter counter={quantity} setCounter={setQuantity} />
                <ActionButton
                  action={() => addProduct(product, quantity)}
                  className={STYLES.BUTTONS.ADD_PRODUCT}
                  text={components.addOneToCartButton.text}
                  ariaLabel='add product to cart'
                />
              </div>
            </div>
          </section>
        </article>
      )}
    </>
  )
}
