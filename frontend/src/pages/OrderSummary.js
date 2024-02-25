import NotificationCard from "#components/ui/NotificationCard"
import { SHIPPING_COST } from "#constants/cart"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { camelCaseToTitleCase } from "#utils/stringManipulation"
import { getSummaryData } from "#utils/users"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./orderSummary.module.scss"

const OrderSummary = () => {
  const [shippingData, setShippingData] = useState({
    street: "",
    number: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  })
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const [orderData, setOrderData] = useState({
    paymentMethod: "",
    totalAmount: "",
  })
  const [notification, setNotification] = useState(null)
  const [orderAndCartItems, setOrderAndCartItems] = useState({})
  const { cart } = useCartContext()
  const { translate } = useTranslation()
  const text = translate.pages.orderSummary
  const navigate = useNavigate()

  const { isLoggedIn, userId, isLoading } = useUserContext()

  useEffect(() => {
    const getUserSummary = async () => {
      const userSummaryResponse = await getSummaryData(
        userId,
        isLoggedIn,
        isLoading,
        setNotification,
      )
      if (userSummaryResponse) {
        setShippingData(userSummaryResponse.shippingData)
        setUserData(userSummaryResponse.userData)
        setOrderData(userSummaryResponse.orderData)
        setOrderAndCartItems(userSummaryResponse.orderAndCartItems)
      }
    }

    getUserSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, navigate, userId, isLoggedIn, isLoading])
  return (
    <>
      <div className={styles.orderSummaryWrapper}>
        {notification && <NotificationCard message={notification} />}
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
                    {userData &&
                      Object.keys(userData).map((key) => (
                        <div key={key} className={styles.clientInfoItem}>
                          <div key={key} className={styles.formField}>
                            {camelCaseToTitleCase(key)}: {userData[key]}
                          </div>
                        </div>
                      ))}
                    {shippingData &&
                      Object.keys(shippingData).map((key) => (
                        <div key={key} className={styles.clientInfoItem}>
                          <div key={key} className={styles.formField}>
                            {camelCaseToTitleCase(key)}: {shippingData[key]}
                          </div>
                        </div>
                      ))}
                    {orderData &&
                      Object.keys(orderData).map((key) =>
                        key === "totalAmount" ? (
                          <div key={key} className={styles.clientInfoItem}>
                            <div key={key} className={styles.formField}>
                              {camelCaseToTitleCase(key)}:{" "}
                              {`${Number(
                                orderData[key] + SHIPPING_COST,
                              ).toFixed(2)} €`}
                            </div>
                          </div>
                        ) : (
                          <div key={key} className={styles.clientInfoItem}>
                            <div key={key} className={styles.formField}>
                              {camelCaseToTitleCase(key)}:{" "}
                              {camelCaseToTitleCase(orderData[key])}
                            </div>
                          </div>
                        ),
                      )}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.purchasedProducts}>
              <div className={styles.cartItemsListWrapper}>
                <div className={styles.cartItemsList}>
                  {orderAndCartItems &&
                    orderAndCartItems.cartItems &&
                    orderAndCartItems.cartItems.map((item, index) => (
                      <div key={index} className={styles.cartItemWrapper}>
                        <div className={styles.cartItem}>
                          <div className={styles.imageContainer}>
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className={styles.image}
                              onError={(e) =>
                                setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
                              }
                            />
                          </div>

                          <div className={styles.cartItemDetails}>
                            <p>{item.product.name}</p>
                            <p>{item.product.size} ml</p>
                            <p>Quantity: {item.quantity}</p>
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
