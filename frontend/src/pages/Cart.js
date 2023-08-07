import React from "react"
import { Link } from "react-router-dom"
import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import { SHIPPING_COST } from "#utils/constants"
import { totalCost, titleCase } from "#utils/utils"
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
            <div>
              <div key={index} className={styles.cartItem}>
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
                <div className={styles.cartItemQuantitySelector}>
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
                  <input
                    type='text'
                    value={item.quantity}
                    className={styles.cartItemQuantityInput}
                  />
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
                  <div className={styles.cartItemTotalCost}>
                    {(item.quantity * Number(item.product.price)).toFixed(2)} €
                  </div>
                </div>
                <span
                  className={styles.cartItemButtonDeleteButton}
                  onClick={() => removeProduct(item.product.name)}
                >
                  {text.deleteButton}
                </span>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className={styles.cartOrderSummary}>
          <h2>{text.orderSummary}</h2>
          <div className={styles.cartOrderSummaryDetails}>
            <div>
              {text.orderSubtotal} {totalCost(cart).toFixed(2)} €
            </div>
            <div>
              {text.orderShipping} {SHIPPING_COST} €
            </div>
            <hr />
            <div>
              {text.orderTotal}
              {(totalCost(cart) + SHIPPING_COST).toFixed(2)} €
            </div>
          </div>

          <Link className={styles.buttonContained} to='/checkout/shipping'>
            Confirm Purchase
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
