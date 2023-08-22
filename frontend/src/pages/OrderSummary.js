import { CartContext } from "#context/cartContext"
import { SHIPPING_COST } from "#utils/constants"
import { cartTotalSum, titleCase } from "#utils/utils"
import React, { useContext } from "react"
import { useLocation } from "react-router-dom"

import useLocaleContext from "#context/localeContext"
import styles from "./orderSummary.module.scss"

const OrderSummary = () => {
  const location = useLocation()
  const { cart } = useContext(CartContext)
  const { shippingData, paymentMethod } = location.state
  const { translate } = useLocaleContext()
  const text = translate.pages.shipping

  console.log(shippingData)
  console.log(paymentMethod)

  return (
    <div className={styles.orderSummaryWrapper}>
      <div className={styles.columnTitle}>
        <h1>Thank you for trust Oylo!</h1>
      </div>
      <div className={styles.orderSummary}>
        <div className={styles.columns}>
          <div className={styles.customerInfo}>
            <div className={styles.infoColumn}>
              <div className={styles.clientInfoContainer}>
                <div className={styles.containerTitle}>{text.yourInfo}</div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='firstName'>
                    {text.inputLabels.firstName}
                  </label>
                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.firstName}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='lastName'>
                    {text.inputLabels.lastName}
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.lastName}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label}>
                    {text.inputLabels.phone}
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.phone}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='country'>
                    {text.inputLabels.country}
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.country}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='state'>
                    {text.inputLabels.state}
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.state}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='city'>
                    {text.inputLabels.city}
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.city}
                  />
                </div>

                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='postalCode'>
                    {text.inputLabels.postalCode}
                  </label>
                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.postalCode}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='address'>
                    {text.inputLabels.address}
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={shippingData.address}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='paidWidth'>
                    Paid with:
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={paymentMethod}
                  />
                </div>
                <div className={styles.clientInfoItem}>
                  <label className={styles.label} htmlFor='total'>
                    Total
                  </label>

                  <input
                    className={styles.formField}
                    readOnly
                    value={cartTotalSum(cart, SHIPPING_COST)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.purchasedProducts}>
            <div className={styles.containerTitle}>
              <h2>Products</h2>
            </div>

            <div className={styles.cartItemsList}>
              {cart.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/" + item.product.image
                    }
                    alt={item.product.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <h3>{titleCase(item.product.name, "_")}</h3>
                    <p>{item.product.size} ml</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
