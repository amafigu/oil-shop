import FormInput from "#components/FormInput"
import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import {
  API_PRODUCTS_PRODUCT_CREATE,
  API_PRODUCT_CATEGORIES,
  DEFAULT_PRODUCT_IMAGE,
  STYLES,
} from "#utils/constants"

import {
  createDataAndSetStates,
  listenInputChangeAndSetDataObject,
  uploadToS3,
} from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./createProductForm.module.scss"

const CreateProductForm = ({ setRefreshAllProductsCounter }) => {
  const [notification, setNotification] = useState(null)
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
    image: "",
  })

  const { translate } = useLocaleContext()
  const text = translate.components.crud
  useEffect(() => {
    try {
      const getProductCategories = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}${API_PRODUCT_CATEGORIES}`,
        )
        setProductCategories(response.data)
      }
      getProductCategories()
    } catch (error) {
      console.error("Can not get product categories ", error)
    }
  }, [])

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const createProduct = async (e) => {
    e.preventDefault()

    let image = await uploadToS3(file)

    if (!image) {
      image = DEFAULT_PRODUCT_IMAGE
      return
    }
    const productDataWithImage = {
      ...productData,
      image,
    }

    const createdData = await createDataAndSetStates(
      e,
      API_PRODUCTS_PRODUCT_CREATE,
      productDataWithImage,
      setNotification,
    )
    if (!createdData) {
      return
    }

    setTimeout(
      () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
      2300,
    )
  }

  return (
    <div>
      {notification && <NotificationCard message={notification} />}
      <form className={styles.form} onSubmit={(e) => createProduct(e)}>
        <div className={styles.actionButtonContainer}></div>

        <div>
          {Object.keys(productData).map((field) =>
            field !== "image" && field !== "productCategoryId" ? (
              <FormInput
                classCss={STYLES.FORMS.FIELD}
                key={field}
                name={field}
                onChangeListener={(e) =>
                  listenInputChangeAndSetDataObject(
                    e,
                    productData,
                    setProductData,
                    setNotification,
                  )
                }
                placeholder={field}
                label={field}
                type={field === "price" || field === "size" ? "number" : "text"}
                value={productData[field]}
              />
            ) : field === "productCategoryId" ? (
              <div className={styles.labelAndInputContainer}>
                <label className={styles.label} htmlFor='name'>
                  {text.forms.commonProperties.category}
                </label>
                <select
                  onChange={(e) =>
                    listenInputChangeAndSetDataObject(
                      e,
                      productData,
                      setProductData,
                      setNotification,
                    )
                  }
                  className={styles.formField}
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
            ) : (
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
            ),
          )}

          <button className={styles.formButton} type='submit'>
            {text.forms.createProductForm.submitButton}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProductForm
