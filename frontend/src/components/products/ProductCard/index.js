import { ActionButton } from "#components/ui/ActionButton"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { ROUTES_PRODUCTS } from "#constants/routes"
import { STYLES } from "#constants/styles"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import { useNavigate } from "react-router-dom"
import styles from "./productCard.module.scss"

export const ProductCard = ({ product }) => {
  const { components } = useTranslation()
  const { addProduct } = useCart()
  const navigate = useNavigate()
  return (
    <article
      className={styles.productCard}
      aria-label={`product: ${product.name}`}
    >
      {product ? (
        <>
          <div className={styles.container}>
            <div
              role='button'
              className={styles.body}
              onClick={() => navigate(`${ROUTES_PRODUCTS}/${product.name}`)}
            >
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
                <h3 className={styles.name}>{titleCase(product.name, "_")}</h3>
                <ul>
                  <li className={styles.size}>
                    {components.products.oil.size}: {product.size} ml
                  </li>
                  <li className={styles.price}>
                    {components.products.oil.price} €{product.price}
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.addButtonContainer}>
              <ActionButton
                action={() => addProduct(product, 1)}
                text={components.addOneToCartButton.text}
                className={STYLES.BUTTONS.ADD_PRODUCT}
              />
            </div>
          </div>
        </>
      ) : (
        <span className={styles.loading}>Loading Product</span>
      )}
    </article>
  )
}
