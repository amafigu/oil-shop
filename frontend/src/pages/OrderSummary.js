import { CartContext } from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import {
  API_SHIPPING_DATA,
  API_USERS_CURRENT_USER,
  API_USERS_GUEST_BY_ID,
  DEFAULT_PRODUCT_IMAGE,
  LOCAL_STORAGE_GUEST_ID,
  SHIPPING_COST,
} from "#utils/constants"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { camelCaseToTitleCase } from "#utils/stringManipulation"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
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
  const [orderAndCartItems, setOrderAndCartItems] = useState({})
  const { cart } = useContext(CartContext)
  const { translate } = useLocaleContext()
  const text = translate.pages.orderSummary
  const navigate = useNavigate()
  const { isLoggedIn, userId, isLoading } = useUserContext()

  useEffect(() => {
    const getSummaryData = async () => {
      console.log("cart", cart)
      console.log("shippingData", shippingData)
      console.log("userData", userData)
      console.log("!isLoading", !isLoading)
      console.log("isLoggedIn", isLoggedIn)
      console.log("isLoggedIn", isLoggedIn)

      try {
        if (!isLoggedIn) {
          console.log("cart", cart)
          const guestId = localStorage.getItem(LOCAL_STORAGE_GUEST_ID)

          const guestDataResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_ID}/${guestId}`,
          )
          if (guestDataResponse.status === 200) {
            const guest = guestDataResponse.data
            console.log("guestDataResponse", guest)
            setUserData({
              firstName: guest.firstName,
              lastName: guest.lastName,
              email: guest.email,
            })

            console.log(userData)
          }

          const shippingDataResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${guestId}`,
          )

          console.log(shippingDataResponse)

          if (shippingDataResponse.status === 200) {
            const data = shippingDataResponse.data
            setShippingData({
              street: data.street,
              number: data.number,
              postalCode: data.postalCode,
              city: data.city,
              state: data.state,
              country: data.country,
            })
          }
          const orderAndCartItemsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/orders/last-order-items/${guestId}`,
          )
          console.log(orderAndCartItemsResponse)
          if (orderAndCartItemsResponse.status === 200) {
            setOrderAndCartItems(orderAndCartItemsResponse.data)
            setOrderData({
              paymentMethod:
                orderAndCartItemsResponse.data.lastOrder[0].paymentMethod,
              totalAmount:
                orderAndCartItemsResponse.data.lastOrder[0].totalAmount,
            })
            console.log(orderData)
          }
        }

        if (isLoggedIn && !isLoading) {
          console.log(isLoggedIn)
          const userDataResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${userId}`,
            { withCredentials: true },
          )

          if (userDataResponse.status === 200) {
            setUserData(userData.data)
          }
          const shippingData = await axios.get(
            `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${userDataResponse.data.id}`,
          )

          if (shippingData.status === 200) {
            setShippingData(shippingData.data)
          }

          const orderAndCartItems = await axios.get(
            `${process.env.REACT_APP_API_URL}/orders/last-order-items/${userDataResponse.data.id}`,
          )
          setOrderAndCartItems(orderAndCartItems.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getSummaryData()
  }, [cart, navigate, setShippingData, userId, isLoggedIn, isLoading])

  console.log("orderAndCartItems", orderAndCartItems)
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
                    {userData &&
                      Object.keys(userData).map((key) => (
                        <div className={styles.clientInfoItem}>
                          <div key={key} className={styles.formField}>
                            {camelCaseToTitleCase(key)}: {userData[key]}
                          </div>
                        </div>
                      ))}
                    {shippingData &&
                      Object.keys(shippingData).map((key) => (
                        <div className={styles.clientInfoItem}>
                          <div key={key} className={styles.formField}>
                            {camelCaseToTitleCase(key)}: {shippingData[key]}
                          </div>
                        </div>
                      ))}
                    {orderData &&
                      Object.keys(orderData).map((key) =>
                        key === "totalAmount" ? (
                          <div className={styles.clientInfoItem}>
                            <div key={key} className={styles.formField}>
                              {camelCaseToTitleCase(key)}:{" "}
                              {`${Number(orderData[key]) + SHIPPING_COST} €`}
                            </div>
                          </div>
                        ) : (
                          <div className={styles.clientInfoItem}>
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
                  {orderAndCartItems.cartItems &&
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
                            <h3>
                              {item.quantity} {item.product.name}
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
