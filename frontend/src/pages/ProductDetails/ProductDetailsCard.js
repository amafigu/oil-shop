import { AddProductToCartButton } from "#components/products/AddProductToCartButton"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { ROUTES_SHOP_QUERY_CATEGORY_PREFIX } from "#constants/routes"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import { Link } from "react-router-dom"
import { ProductQuantity } from "./ProductQuantity"
import styles from "./productDetailsCard.module.scss"

export const ProductDetailsCard = ({ product, quantity, setQuantity }) => {
  return (
    <article className={styles.card} aria-label='Product details'>
      <section className={styles.cardBody}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
            onError={(e) => setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)}
          />
        </div>
        <div className={styles.details}>
          <dl className={styles.right}>
            <dt className={styles.hideForSemantic}>Details</dt>
            <dd
              className={styles.category}
              aria-label='link to products of this category'
            >
              <Link
                className={styles.categoryLink}
                to={`${ROUTES_SHOP_QUERY_CATEGORY_PREFIX}${product.category.name}`}
              >
                {titleCase(product.category.name, "_")}
              </Link>
            </dd>
            <dd className={styles.name}>
              {titleCase(product.name, "_")} {product.size}ml
            </dd>
            <dd className={styles.item}>{product.description}</dd>
            <dd className={styles.item}>{product.details}</dd>
            <div className={styles.sizeAndPrice}>
              <dd className={styles.size}>{product.size} ml</dd>
              <dd className={styles.price}>${product.price}</dd>
            </div>
          </dl>
          <div
            className={styles.container}
            aria-label='quantity selector and add to cart button'
          >
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            <AddProductToCartButton
              product={product}
              classname={styles.addProductToCartButton}
              quantity={quantity}
            />
          </div>
        </div>
      </section>
    </article>
  )
}
