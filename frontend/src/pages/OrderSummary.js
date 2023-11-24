import { CartContext } from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { DEFAULT_PRODUCT_IMAGE } from "#utils/constants"
import {
  setDefaultImageByError,
  titleCase,
  useEffectScrollTop,
} from "#utils/utils"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./orderSummary.module.scss"

const OrderSummary = () => {
  const [shippingData, setShippingData] = useState({})
  const [userData, setUserData] = useState({})
  const [orderAndCartItems, setOrderAndCartItems] = useState({})
  const { cart } = useContext(CartContext)

  const { translate } = useLocaleContext()
  const text = translate.pages.orderSummary
  const navigate = useNavigate()
  const { isLoggedIn, userId } = useUserContext()

  useEffect(() => {
    const getShippingData = async () => {
      try {
        if (!isLoggedIn) {
          const guestId = localStorage.getItem("yolo-guest-id")

          const userData = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/guest/${guestId}`,
          )
          if (userData.status === 200) {
            setUserData(userData.data)
          }

          const shippingData = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${guestId}`,
          )

          if (shippingData.status === 200) {
            setShippingData(shippingData.data)
          }
          const orderAndCartItems = await axios.get(
            `${process.env.REACT_APP_API_URL}/orders/last-order-items/${guestId}`,
          )
          setOrderAndCartItems(orderAndCartItems.data)
        }

        if (isLoggedIn) {
          const userData = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/current-user`,
            { withCredentials: true },
          )

          if (userData.status === 200) {
            setUserData(userData.data)
          }
          const shippingData = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userData.data.id}`,
          )

          if (shippingData.status === 200) {
            setShippingData(shippingData.data)
          }

          const orderAndCartItems = await axios.get(
            `${process.env.REACT_APP_API_URL}/orders/last-order-items/${userData.data.id}`,
          )
          setOrderAndCartItems(orderAndCartItems.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getShippingData()
  }, [cart, navigate, setShippingData, userId, isLoggedIn])

  useEffectScrollTop()

  return (
    <>
      <div className={styles.orderSummaryWrapper}>
        <div className={styles.columnTitle}>
          <span className={styles.pageTitle}>{text.thankClient}</span>
          <span className={styles.summaryTitle}>{text.orderResume}:</span>
        </div>
        <div className={styles.orderSummary}>
          <div className={styles.columns}>
            <div className={styles.infoColumnContainer}>
              <div className={styles.infoColumn}>
                {shippingData && (
                  <div className={styles.clientInfoContainer}>
                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {userData.firstName}
                      </div>
                    </div>
                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {userData.lastName}
                      </div>
                    </div>
                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {shippingData.street}
                      </div>
                    </div>
                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {shippingData.number}
                      </div>
                    </div>

                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {shippingData.city}
                      </div>
                    </div>
                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {shippingData.country}
                      </div>
                    </div>

                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {shippingData.postal_code}
                      </div>
                    </div>

                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>Payment </div>
                    </div>
                    <div className={styles.clientInfoItem}>
                      <div className={styles.formField}>
                        {/*   {`${Number(
                          orderAndCartItems.lastOrder.totalAmount +
                            SHIPPING_COST,
                        ).toFixed(2)} 
                        €`} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.purchasedProducts}>
              <div className={styles.cartItemsListWrapper}>
                <div className={styles.cartItemsList}>
                  {orderAndCartItems.cartItems &&
                    orderAndCartItems.cartItems.map((item, index) => (
                      <div key={index} className={styles.cartItemWrapper}>
                        <div className={styles.cartItem}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className={styles.cartItemImage}
                            onError={(e) =>
                              setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                            }
                          />
                          <div className={styles.cartItemDetails}>
                            <h3>
                              {item.quantity}{" "}
                              {titleCase(item.product.name, "_")}
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
    </>
  )
}

export default OrderSummary
