import NotificationCard from "#components/NotificationCard"
import { getProductByName, titleCase } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./updateProductForm.module.scss"

const UpdateProductForm = () => {
  const [notification, setNotification] = useState(null)
  const [showSearchAndForm, setShowSearchAndForm] = useState(false)

  const [productCategories, setProductCategories] = useState(null)
  const [findProductData, setFindProductData] = useState({
    name: "",
    size: "",
    productCategoryId: "",
  })

  const [productOldData, setProductOldData] = useState({
    name: "",
    productCategoryId: "",
    description: "",
    price: "",
    details: "",
    measure: "",
    image: "",
    size: "",
  })

  const [productNewData, setProductNewData] = useState({
    name: "",
    productCategoryId: "",
    description: "",
    price: "",
    details: "",
    measure: "",
    image: "",
    size: "",
  })

  useEffect(() => {
    try {
      const getProductCategories = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/product-categories`,
        )
        setProductCategories(response.data)
      }
      getProductCategories()
    } catch (error) {
      console.error("Can not get product categories ", error)
    }
  }, [])

  const listenProductToFind = (e) => {
    let valueToCheck = e.target.value

    setFindProductData({ ...findProductData, [e.target.name]: valueToCheck })
  }

  const listenUpdateProductData = (e) => {
    let valueToCheck = e.target.value
    if (e.target.type === "number" || e.target.name === "productCategoryId") {
      valueToCheck = Number(e.target.value)
    }
    console.log(productNewData)
    setProductNewData({ ...productNewData, [e.target.name]: valueToCheck })
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    if (JSON.stringify(productOldData) === JSON.stringify(productNewData)) {
      setNotification("No changes made.")
      return
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${findProductData.name}`,
        productNewData,
        { withCredentials: true },
      )
      setProductNewData(response.data)
      setNotification("setProduct")
      setTimeout(() => setNotification(null), 1300)
    } catch (error) {
      console.error("Can not edit product ", error)
    }
  }

  const getProductByNameAndShowForm = () => {
    getProductByName(findProductData.name, setProductOldData, setNotification)
  }

  return (
    <div>
      {notification && <NotificationCard message={notification} />}

      <div className={styles.toggleButtonsContainer}>
        {showSearchAndForm ? (
          <button
            className={styles.formButton}
            onClick={() => setShowSearchAndForm(false)}
          >
            HIDE FORM
          </button>
        ) : (
          <button
            className={styles.formButton}
            onClick={() => setShowSearchAndForm(true)}
          >
            SHOW FORM
          </button>
        )}
      </div>
      {showSearchAndForm && (
        <div className={styles.searchProductAndFormWrapper}>
          <label className={styles.label} htmlFor='productName'>
            Product Name
          </label>
          <input
            className={styles.formField}
            type='text'
            name='name'
            onChange={(e) => listenProductToFind(e)}
            placeholder={"Name"}
          />
          <label className={styles.label} htmlFor='productName'>
            Product Category
          </label>
          <input
            className={styles.formField}
            type='text'
            name='productCategoryId'
            onChange={(e) => listenProductToFind(e)}
            placeholder={"Category"}
          />
          <label className={styles.label} htmlFor='productName'>
            Size
          </label>
          <input
            className={styles.formField}
            type='number'
            step={1}
            name='size'
            onChange={(e) => listenProductToFind(e)}
            placeholder={"Size"}
          />
          <button
            className={styles.formButton}
            onClick={() => getProductByNameAndShowForm()}
          >
            Set Product
          </button>

          <form className={styles.form} onSubmit={updateProduct}>
            <label className={styles.label} htmlFor='name'></label>
            <input
              className={styles.formField}
              type='text'
              name='name'
              onChange={listenUpdateProductData}
              required
            />

            <label className={styles.label} htmlFor='category'>
              category
            </label>
            <select
              onChange={listenUpdateProductData}
              className={styles.formFieldSelect}
              name='productCategoryId'
            >
              {productCategories
                ? productCategories
                    .filter((category) => category.name !== "all")
                    .map((productCategory) => (
                      <option
                        key={productCategory.id}
                        className={styles.formField}
                        value={productCategory.id}
                      >
                        {titleCase(productCategory.name, "_")}
                      </option>
                    ))
                : ""}
            </select>

            <label className={styles.label} htmlFor='name'>
              price
            </label>
            <input
              className={styles.formField}
              type='number'
              name='price'
              step='.01'
              onChange={listenUpdateProductData}
              required
            />

            <label className={styles.label} htmlFor='description'>
              description
            </label>
            <input
              className={styles.formField}
              type='text'
              name='description'
              onChange={listenUpdateProductData}
              required
            />

            <label className={styles.label} htmlFor='details'>
              details
            </label>
            <input
              className={styles.formField}
              type='text'
              name='details'
              onChange={listenUpdateProductData}
              required
            />

            <label className={styles.label} htmlFor='size'>
              size
            </label>
            <input
              className={styles.formField}
              type='number'
              name='size'
              onChange={listenUpdateProductData}
              required
            />

            <label className={styles.label} htmlFor='measure'>
              measure
            </label>
            <input
              className={styles.formField}
              type='text'
              name='measure'
              onChange={listenUpdateProductData}
              required
            />

            <label className={styles.label} htmlFor='image'>
              image
            </label>
            <input
              className={styles.formField}
              type='text'
              name='image'
              onChange={listenUpdateProductData}
              required
            />
            <button className={styles.formButton} type='submit'>
              EDIT
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default UpdateProductForm
