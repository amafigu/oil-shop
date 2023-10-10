import axios from "axios"
import React, { useEffect, useState } from "react"
import style from "./admin.module.scss"

const Admin = () => {
  const [adminData, setAdminData] = useState(null)
  const [productData, setProductData] = useState({})
  const [productCategoryId, setProductCategoryId] = useState(null)

  /*
  const [productName, setProductName] = useState("")

  const [productPrice, setProductPrice] = useState(0)
  const [productDescription, setProductDescription] = useState("")
  const [productDetails, setProductDetails] = useState("")
  const [productMeasure, setProductMeasure] = useState("")
  const [productImageUrl, setProductImageUrl] = useState("")
  const [productSize, setProductSize] = useState(0)

  */

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
      const getProductCategoryId = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/product-categories`,
        )
        console.log("getProductsCat ", response)
      }
      getProductCategoryId()
    } catch (error) {
      console.error("Can not get product categories ", error)
    }
  }, [])

  useEffect(() => {
    console.log("listenInputChange productData ", productData)
  }, [productData])

  const listenInputChange = (e) => {
    const { name, value } = e.target

    let valueToCheck = value
    if (e.target.type === "number") {
      valueToCheck = parseFloat(value)
    }

    console.log("listenInputChange e.target ", e.target)
    setProductData((previousState) => ({
      ...previousState,
      [name]: valueToCheck,
    }))
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
    } catch (error) {
      console.log("productData ", productData)
      console.error("Product submit failed: ", error)
    }
  }

  return (
    <div className=''>
      <div className={style.adminCrudContainer}>
        <div className={style.pageTitle}>
          {adminData
            ? `Hello, ${adminData.firstName} ${adminData.lastName} you are loggin as a ${adminData.role}!`
            : "Loading admin data..."}
        </div>
        <div>Admin Info Page</div>
        <div className={style.productCrudContainer}>
          <form
            className={style.createProductForm}
            onSubmit={submitProductForm}
          >
            <label>Name</label>
            <input type='text' name='name' onChange={listenInputChange} />

            <label>Category</label>
            <input
              type='number'
              name='productCategoryId'
              onChange={listenInputChange}
            />

            <label>Price</label>
            <input type='number' name='price' onChange={listenInputChange} />

            <label>Description</label>
            <input
              type='text'
              name='description'
              onChange={listenInputChange}
            />

            <label>Details</label>
            <input type='text' name='details' onChange={listenInputChange} />

            <label>Size</label>
            <input type='number' name='size' onChange={listenInputChange} />

            <label>Measure</label>
            <input type='text' name='measure' onChange={listenInputChange} />

            <label>Image Upload</label>
            <input type='text' name='image' onChange={listenInputChange} />

            <button type='submit'>submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin
