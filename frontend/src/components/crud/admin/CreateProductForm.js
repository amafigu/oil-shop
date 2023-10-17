import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { titleCase, uploadToS3 } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./createProductForm.module.scss"

const CreateProductForm = () => {
  const [notification, setNotification] = useState(null)
  const [showFormInputs, setShowFormInputs] = useState(false)
  const [productCategories, setProductCategories] = useState(null)
  const [file, setFile] = useState(null)

  const [productData, setProductData] = useState({
    name: "",
    productCategoryId: "",
    description: "",
    price: "",
    details: "",
    measure: "",
    size: "",
  })

  const { translate } = useLocaleContext()
  const text = translate.components.crud

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

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const submitProductForm = async (e) => {
    e.preventDefault()

    const imageUrl = await uploadToS3(file)

    if (!imageUrl) {
      console.error("!imageUrlFailed to upload image to S3")

      return
    }
    const productDataWithImage = {
      ...productData,
      image: imageUrl,
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/create`,
        productDataWithImage,
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
      <form className={styles.form} onSubmit={() => submitProductForm()}>
        <div className={styles.actionButtonContainer}>
          {showFormInputs ? (
            <button
              className={styles.formButton}
              onClick={() => setShowFormInputs(false)}
              type='button'
            >
              HIDE FORM
            </button>
          ) : (
            <button
              className={styles.formButton}
              onClick={() => setShowFormInputs(true)}
              type='button'
            >
              SHOW FORM
            </button>
          )}
        </div>
        {showFormInputs && (
          <div>
            <div className={styles.inputsContainer}>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='name'>
                  {text.forms.commonProperties.name}
                </label>
                <input
                  className={styles.formField}
                  type='text'
                  name='name'
                  onChange={listenInputChange}
                  required
                />
              </div>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='name'>
                  {text.forms.commonProperties.category}
                </label>
                <select
                  onChange={listenInputChange}
                  className={styles.formFieldSelect}
                  name='productCategoryId'
                  value={productData.productCategoryId}
                >
                  <option value='' disabled>
                    Select a category
                  </option>
                  {productCategories
                    ? productCategories
                        .filter((category) => category.name !== "all")
                        .map((productCategory) => (
                          <option
                            key={productCategory.id}
                            className={styles.formField}
                            value={productCategory.id}
                            name={productCategory.id}
                          >
                            {titleCase(productCategory.name, "_")}
                          </option>
                        ))
                    : ""}
                </select>
              </div>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='name'>
                  {text.forms.commonProperties.price}
                </label>
                <input
                  className={styles.formField}
                  type='number'
                  name='price'
                  step='.01'
                  onChange={listenInputChange}
                  required
                />
              </div>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='description'>
                  {text.forms.commonProperties.description}
                </label>
                <input
                  className={styles.formField}
                  type='text'
                  name='description'
                  onChange={listenInputChange}
                  required
                />
              </div>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='details'>
                  {text.forms.commonProperties.details}
                </label>
                <input
                  className={styles.formField}
                  type='text'
                  name='details'
                  onChange={listenInputChange}
                  required
                />
              </div>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='size'>
                  {text.forms.commonProperties.size}
                </label>
                <input
                  className={styles.formField}
                  type='number'
                  name='size'
                  onChange={listenInputChange}
                  min={1}
                  required
                />
              </div>
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='measure'>
                  {text.forms.commonProperties.measure}
                </label>
                <input
                  className={styles.formField}
                  type='text'
                  name='measure'
                  onChange={listenInputChange}
                  required
                />
              </div>
              <div className={styles.labelAndInputContainer}>
                <span className={styles.label}>
                  {file ? "Selected file: " : "Select a file"}
                </span>
                <label className={styles.labelForFile} htmlFor='fileInput'>
                  {file ? file.name : "Search on device"}
                </label>

                <input
                  type='file'
                  name='image'
                  id='fileInput'
                  onChange={setFileToUpload}
                  required
                />
              </div>
            </div>

            <button className={styles.formButton} type='submit'>
              {text.forms.createProductForm.submitButton}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateProductForm
