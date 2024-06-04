import { ActionButton } from "#components/ui/ActionButton"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { SHOP } from "#constants/routes"
import { STYLES } from "#constants/styles"
import { useCart } from "#hooks/useCart"
import { useProductCategory } from "#hooks/useProductCategory"
import { useProductDetails } from "#hooks/useProductDetails"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/titleCase"
import { Link } from "react-router-dom"
import { Counter } from "./Counter"
import styles from "./productDetailsCard.module.scss"

export const ProductDetailsCard = () => {
  const { product, quantity, setQuantity } = useProductDetails()
  const { addProduct } = useCart()
  const { components } = useTranslation()
  const { setSortCategory } = useProductCategory()

  return (
    <>
      {product && (
        <article
          className={styles.wrapper}
          aria-label={`${product.name} details`}
        >
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
              <ul className={styles.list}>
                <li
                  className={styles.category}
                  aria-label={`link to ${product.category.name} products`}
                >
                  <Link
                    className={styles.link}
                    to={SHOP}
                    onClick={() => setSortCategory(product.category.name)}
                  >
                    {titleCase(product.category.name, " ")}
                  </Link>
                </li>

                <li className={styles.name}>
                  {titleCase(product.name, " ")} {product.size} ml
                </li>
                <li className={styles.description}>{product.description}</li>
                <li className={styles.details}>{product.details}</li>
                <li className={styles.detailsRow}>
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
