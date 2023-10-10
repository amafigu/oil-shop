import axios from "axios"

import { titleCase } from "#utils/utils"
import React, { useEffect, useState } from "react"
import NotificationCard from "../components/NotificationCard"
import styles from "./admin.module.scss"

const Admin = () => {
  const [adminData, setAdminData] = useState(null)
  const [notification, setNotification] = useState(null)
  const [productData, setProductData] = useState({
    name: "",
    productCategoryId: "",
    description: "",
    price: "",
    details: "",
    measure: "",
    image: "",
    size: "",
  })

  const [productCategories, setProductCategories] = useState(null)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
        setAdminData(response.data)
      } catch (error) {
        console.error("Error fetching admin data", error)
      }
    }

    fetchAdminData()
  }, [])

  useEffect(() => {
    try {
      const getProductCategories = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/product-categories`,
        )
        setProductCategories(response)
        console.log("getProductsCat ", response)
      }
      getProductCategories()
    } catch (error) {
      console.error("Can not get product categories ", error)
    }
  }, [])

  useEffect(() => {
    console.log("listenInputChange productData ", productData)
  }, [productData])

  const listenInputChange = (e) => {
    let valueToCheck = e.target.value
    if (e.target.type === "number") {
      valueToCheck = parseFloat(e.target.value)
    }

    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const uploadImageToBucket = () => {
    // send
  }

  const submitProductForm = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/create`,
        productData,
        { withCredentials: true },
      )
      setNotification(
        ` ${titleCase(productData.name, "_")} was added to your products list `,
      )
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      setNotification(`Error by creating new product`)
      setTimeout(() => setNotification(null), 1300)
      console.error("Product submit failed: ", error)
    }
  }

  return (
    <div className={styles.adminPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.adminPage}>
        <div className={styles.adminFormTitel}>
          {adminData
            ? `Hello, ${adminData.firstName} ${adminData.lastName} you are loggin as a ${adminData.role}!`
            : "Loading admin data..."}
        </div>
        <div className={styles.containerTitle}>Admin Info Page</div>
        <div className={styles.productCrudContainer}>
          <form className={styles.form} onSubmit={submitProductForm}>
            <label className={styles.label} htmlFor='name'>
              Name
            </label>
            <input
              className={styles.formField}
              type='text'
              name='name'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='name'>
              Category
            </label>
            <input
              className={styles.formField}
              type='number'
              name='productCategoryId'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='name'>
              Price
            </label>
            <input
              className={styles.formField}
              type='number'
              name='price'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='description'>
              Description
            </label>
            <input
              className={styles.formField}
              type='text'
              name='description'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='details'>
              Details
            </label>
            <input
              className={styles.formField}
              type='text'
              name='details'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='size'>
              Size
            </label>
            <input
              className={styles.formField}
              type='number'
              name='size'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='measure'>
              Measure
            </label>
            <input
              className={styles.formField}
              type='text'
              name='measure'
              onChange={listenInputChange}
              required
            />

            <label className={styles.label} htmlFor='image'>
              Image Upload
            </label>
            <input
              className={styles.formField}
              type='text'
              name='image'
              onChange={listenInputChange}
              required
            />

            <button className={styles.formButton} type='submit'>
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin
