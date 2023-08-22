import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import { SHIPPING_COST } from "#utils/constants"
import { cartTotalSum, titleCase, totalCost } from "#utils/utils"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./cart.module.scss"

const Cart = () => {
  const { cart, removeProduct, updateProductQuantity } = useCartContext()
  const { translate } = useLocaleContext()
  const text = translate.pages.cart

  return (
    <div className={styles.cartContainerWrapper}>
      <div className={styles.cartContainer}>
        <div className={styles.cartItemsList}>
          {cart.map((item, index) => (
            <div key={index}>
              <div className={styles.cartItem}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/" + item.product.image}
                  alt={item.product.name}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h3>{titleCase(item.product.name, "_")}</h3>
                  <p>{item.product.description}</p>
                  <p>{item.product.size} ml</p>
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
                      -
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
                      +
                    </button>
                  </div>
                  <div className={styles.cartItemTotalCost}>
                    {(item.quantity * Number(item.product.price)).toFixed(2)} €
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
          ))}
        </div>

        <div className={styles.cartOrderSummary}>
          <h2 className={styles.orderSumaryText}>{text.orderSummary}</h2>
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
          <Link className={styles.confimOrderButton} to='/checkout/shipping'>
            Confirm Purchase
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
