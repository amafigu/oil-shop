import { uploadToS3 } from "#api/aws/uploadToS3"
import { createDataAndSetStates } from "#api/generics/createDataAndSetStates"
import { getProductCategories } from "#api/products/getProductCategories"
import FormInput from "#components/ui/FormInput"
import NotificationCard from "#components/ui/NotificationCard"
import { API_PRODUCTS_PRODUCT_CREATE } from "#constants/api"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { STYLES } from "#constants/styles"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { useTranslation } from "#hooks/useTranslation"
import { listenInputChangeAndSetDataObject } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
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

  const { translate } = useTranslation()
  const text = translate.components.crud

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const productCategoriesResponse = await getProductCategories()
        setProductCategories(productCategoriesResponse.data)
      } catch (error) {
        console.error("Can not get product categories ", error)
      }
    }
    fetchProductCategories()
  }, [])

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const createProduct = async (e) => {
    try {
      e.preventDefault()

      let image = await uploadToS3(file)

      if (!image) {
        image = DEFAULT_PRODUCT_IMAGE
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
        console.error("no created data")
      }

      setRefreshAllProductsCounter((prevCounter) => prevCounter + 1)
    } catch (error) {
      console.error(error)
      setNotification("Product creation failed")
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
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
              <div className={styles.labelAndInputContainer} key={field}>
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
              <div className={styles.labelAndInputContainer} key={field}>
                <span className={styles.label}>
                  {file ? "Selected file: " : "Select a file"}
                </span>
                <label className={styles.labelForFile} htmlFor='fileInput'>
                  {file ? file.name : "Search on device"}
                </label>

                <input
                  key={field}
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
