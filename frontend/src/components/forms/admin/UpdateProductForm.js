import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { titleCase } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./updateProductForm.module.scss"

const UpdateProductForm = () => {
  const [notification, setNotification] = useState(null)

  const [productCategories, setProductCategories] = useState(null)
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

  const { translate } = useLocaleContext()
  const text = translate.components.forms

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

  const listenInputChange = (e) => {
    let valueToCheck = e.target.value
    if (e.target.type === "number" || e.target.name === "productCategoryId") {
      valueToCheck = Number(e.target.value)
    }

    setProductData({ ...productData, [e.target.name]: valueToCheck })
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
    <div>
      {notification && <NotificationCard message={notification} />}
      <form className={styles.form} onSubmit={submitProductForm}>
        <label className={styles.label} htmlFor='name'>
          {text.commonProperties.name}
        </label>
        <input
          className={styles.formField}
          type='text'
          name='name'
          onChange={listenInputChange}
          required
        />

        <label className={styles.label} htmlFor='name'>
          {text.commonProperties.category}
        </label>
        <select
          onChange={listenInputChange}
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
          {text.commonProperties.price}
        </label>
        <input
          className={styles.formField}
          type='number'
          name='price'
          step='.01'
          onChange={listenInputChange}
          required
        />

        <label className={styles.label} htmlFor='description'>
          {text.commonProperties.description}
        </label>
        <input
          className={styles.formField}
          type='text'
          name='description'
          onChange={listenInputChange}
          required
        />

        <label className={styles.label} htmlFor='details'>
          {text.commonProperties.details}
        </label>
        <input
          className={styles.formField}
          type='text'
          name='details'
          onChange={listenInputChange}
          required
        />

        <label className={styles.label} htmlFor='size'>
          {text.commonProperties.size}
        </label>
        <input
          className={styles.formField}
          type='number'
          name='size'
          onChange={listenInputChange}
          required
        />

        <label className={styles.label} htmlFor='measure'>
          {text.commonProperties.measure}
        </label>
        <input
          className={styles.formField}
          type='text'
          name='measure'
          onChange={listenInputChange}
          required
        />

        <label className={styles.label} htmlFor='image'>
          {text.commonProperties.imageUrl}
        </label>
        <input
          className={styles.formField}
          type='text'
          name='image'
          onChange={listenInputChange}
          required
        />
        <button className={styles.formButton} type='submit'>
          {text.submitButton}
        </button>
      </form>
    </div>
  )
}

export default UpdateProductForm
