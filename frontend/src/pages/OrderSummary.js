import { CartContext } from "#context/cartContext"
import { SHIPPING_COST } from "#utils/constants"
import { cartTotalSum, titleCase } from "#utils/utils"
import React, { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import styles from "./orderSummary.module.scss"

const OrderSummary = () => {
  const location = useLocation()
  const { cart } = useContext(CartContext)

  const { translate } = useLocaleContext()
  const text = translate.pages.orderSummary
  const navigate = useNavigate()

  let shippingData = {}
  let paymentMethod = ""

  //Volver por ahi db

  if (location.state) {
    shippingData = location.state.shippingData
    paymentMethod = location.state.paymentMethod
  }

  useEffect(() => {
    if (!location.state || !location.state.shippingData || cart.length <= 0) {
      navigate("/cart")
    }
  }, [location.state, cart, navigate])

  useEffectScrollTop()

  return (
    <div className={styles.orderSummaryWrapper}>
      <div className={styles.columnTitle}>
        <span className={styles.pageTitle}>{text.thankClient}</span>
        <span className={styles.summaryTitle}>{text.orderResume}:</span>
      </div>
      <div className={styles.orderSummary}>
        <div className={styles.columns}>
          <div className={styles.infoColumnContainer}>
            <div className={styles.infoColumn}>
              <div className={styles.clientInfoContainer}>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>
                    {shippingData.firstName}
                  </div>
                </div>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>
                    {shippingData.lastName}
                  </div>
                </div>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>{shippingData.phone}</div>
                </div>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>{shippingData.address}</div>
                </div>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>{shippingData.city}</div>
                </div>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>{shippingData.country}</div>
                </div>

                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>
                    {shippingData.postalCode}
                  </div>
                </div>

                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>{paymentMethod}</div>
                </div>
                <div className={styles.clientInfoItem}>
                  <div className={styles.formField}>
                    {`${cartTotalSum(cart, SHIPPING_COST).toFixed(2)} €`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.purchasedProducts}>
            <div className={styles.cartItemsListWrapper}>
              <div className={styles.cartItemsList}>
                {cart.map((item, index) => (
                  <div className={styles.cartItemWrapper}>
                    <div key={index} className={styles.cartItem}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className={styles.cartItemImage}
                      />
                      <div className={styles.cartItemDetails}>
                        <h3>
                          {item.quantity} {titleCase(item.product.name, "_")}
                        </h3>
                        <p>{item.product.size} ml</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
