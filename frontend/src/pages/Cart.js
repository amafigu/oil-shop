import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import { cartTotalSum, totalCost } from "#utils/cart"
import { DEFAULT_PRODUCT_IMAGE, SHIPPING_COST } from "#utils/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { useEffectScrollTop } from "#utils/render"
import { titleCase } from "#utils/stringManipulation"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./cart.module.scss"
const Cart = () => {
  const { cart, removeProduct, updateProductQuantity } = useCartContext()
  const { translate } = useLocaleContext()
  const text = translate.pages.cart

  useEffectScrollTop()

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cart}>
        <div className={styles.cartItemsList}>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div className={styles.cartItemContainer} key={index}>
                <div className={styles.cartItem}>
                  <div className={styles.imagesAndDetails}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className={styles.cartItemImage}
                      onError={(e) => {
                        setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                      }}
                    />
                    <div className={styles.cartItemDetails}>
                      <h3>{titleCase(item.product.name, "_")}</h3>
                      <p>{item.product.description}</p>
                      <p>{item.product.size} ml</p>
                    </div>
                  </div>

                  <div className={styles.cartItemSelectors}>
                    <div className={styles.quantityButtonsContainer}>
                      <button
                        className={styles.cartItemQuantityButton}
                        onClick={() =>
                          updateProductQuantity(
                            item.product.name,
                            item.quantity - 1,
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className={styles.cartItemQuantityInput}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles.cartItemQuantityButton}
                        onClick={() =>
                          updateProductQuantity(
                            item.product.name,
                            item.quantity + 1,
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className={styles.cartItemTotalCost}>
                      {(item.quantity * Number(item.product.price)).toFixed(2)}{" "}
                      €
                    </div>
                    <div className={styles.deleteButtonWrapper}>
                      <span
                        className={styles.deleteButton}
                        onClick={() => removeProduct(item.product.name)}
                      >
                        {text.deleteButton}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className={styles.cartEmptyMessage}>
              <h1>{text.emptyCart}</h1>
            </div>
          )}
        </div>

        <div className={styles.cartOrderSummary}>
          <h2 className={styles.orderSummaryText}>{text.orderSummary}</h2>
          <div className={styles.cartOrderSummaryDetails}>
            <div>
              <span>{text.orderSubtotal} </span>
              <span>{totalCost(cart).toFixed(2)} €</span>
            </div>
            <div>
              <span>{text.orderShipping} </span>
              <span>{SHIPPING_COST.toFixed(2)} €</span>
            </div>
            <div className={styles.totalCostDivider}>
              <hr />
            </div>

            <div>
              <span className={styles.orderTotalText}>{text.orderTotal} </span>
              <span>{cartTotalSum(cart, SHIPPING_COST).toFixed(2)} €</span>
            </div>
          </div>
          {cart.length ? (
            <Link className={styles.confirmOrderButton} to='/checkout/shipping'>
              {text.confirmPurchase}
            </Link>
          ) : (
            <Link className={styles.confirmOrderButton} to='/cart'>
              {text.orderToContinue}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
