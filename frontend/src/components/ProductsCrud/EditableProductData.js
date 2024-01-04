import EditableImageInput from "#components/EditableImageInput"
import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import { API_PRODUCTS, DEFAULT_PRODUCT_IMAGE, STYLES } from "#utils/constants"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import { getProductByName } from "#utils/products"
import axios from "axios"
import { useState } from "react"
import styles from "./editableProductData.module.scss"

const EditableProductData = ({ setRefreshAllProductsCounter }) => {
  const [showForm, setShowForm] = useState(false)

  const initialProductData = {
    name: "",
    description: "",
    price: "",
    image: "",
    size: "",
  }

  const [nonUpdatedProductData, setNonUpdatedProductData] = useState({
    ...initialProductData,
  })

  const [updatedProductData, setUpdatedProductData] = useState({
    ...initialProductData,
  })

  const [showProductForm, setShowProductForm] = useState(false)
  const [productName, setProductName] = useState("")
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const { translate } = useLocaleContext()

  const textAdminCrud = translate.pages.admin.crud
  const buttonsText = translate.components

  console.log(Object.keys(initialProductData))
  console.log(nonUpdatedProductData)
  console.log(updatedProductData)
  const updateProductDataAndSetStates = async (e, propertyName) => {
    let image = ""

    if (file) {
      image = await uploadToS3(file)
    }

    console.log(
      "updateProductDataAndSetStates -> updatedProductData",
      updatedProductData,
    )

    console.log("updateProductDataAndSetStates -> propertyName", propertyName)
    let updatedProductDataWithImage = { ...updatedProductData, image }
    setUpdatedProductData(updatedProductDataWithImage)

    const updatedData = await updateDataAndSetStates(
      e,
      propertyName,
      nonUpdatedProductData.name,
      API_PRODUCTS,
      setNonUpdatedProductData,
      updatedProductDataWithImage,
      setUpdatedProductData,
      setNotification,
    )
    if (!updatedData) {
      return
    }
    setUpdatedProductData(updatedData.data.product)
  }

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const searchProduct = async (name) => {
    console.log("searchProduct -> name", name)
    const product = await getProductByName(name.trim())
    console.log("searchProduct -> product", product)

    if (!product) {
      setNotification("Product not found")
      setTimeout(() => setNotification(null), 2000)
      return
    }
    setNonUpdatedProductData(product)
    setShowProductForm(true)
  }

  const deleteProductAndUpdateState = async (productName) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}${API_PRODUCTS}/${productName.trim()}`,
        {
          withCredentials: true,
        },
      )
      setNotification(`${productName} deleted`)
      setNonUpdatedProductData({ ...initialProductData })
      setProductName("")
      setShowProductForm(false)
      setTimeout(() => setNotification(null), 2000)
      setTimeout(
        () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
        2300,
      )
    } catch (error) {
      setNotification(`${productName} not deleted`)
      setTimeout(() => setNotification(null), 3000)
      console.error("Can not delete product", error)
    }
  }

  return (
    <>
      <div className={styles.editableProductDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <ToggleButton
          show={showForm}
          setToggle={setShowForm}
          textHide={`${textAdminCrud?.products.getByName.hide.toUpperCase()}`}
          textShow={`${textAdminCrud?.products.getByName.show.toUpperCase()}`}
          classCss={STYLES.BUTTONS.USER_OPTIONS}
        />
        {showForm && (
          <div className={styles.formContainer}>
            <div className={styles.imageAndInputContainer}>
              {nonUpdatedProductData !== initialProductData && (
                <div className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={
                      !nonUpdatedProductData.image
                        ? DEFAULT_PRODUCT_IMAGE
                        : nonUpdatedProductData.image
                    }
                    alt='product'
                  />
                </div>
              )}
              <div className={styles.inputAndSearchButtonContainer}>
                <input
                  className={styles[STYLES.FORMS.FIELD_SEARCH_INPUT]}
                  onChange={(e) => setProductName(e.target.value)}
                  type='text'
                ></input>
                <button
                  className={styles.formButton}
                  onClick={() => searchProduct(productName)}
                >
                  {buttonsText.crud.getProduct.getByName}
                </button>
              </div>

              <button
                className={styles.formButton}
                onClick={() =>
                  deleteProductAndUpdateState(
                    productName,
                    setNotification,
                    textAdminCrud.users.deletedByEmail,
                    textAdminCrud.users.deleteError,
                  )
                }
              >
                {buttonsText.crud.deleteProduct.button}
              </button>
            </div>
            {showProductForm &&
              Object.keys(initialProductData).map((key) =>
                key !== "image" ? (
                  <div className={styles.inputContainer} key={key}>
                    {updatedProductData[key] && (
                      <EditableInput
                        label={key}
                        name={key}
                        value={updatedProductData[key]}
                        onChange={(e) =>
                          listenInputChangeAndSetDataObject(
                            e,
                            updatedProductData,
                            setUpdatedProductData,
                            setNotification,
                          )
                        }
                        onSave={(e) => updateProductDataAndSetStates(e, key)}
                        classCss={STYLES.FORMS.FIELD}
                        originalPropertyData={nonUpdatedProductData}
                        updatedPropertyData={updatedProductData}
                      />
                    )}
                  </div>
                ) : (
                  <div className={styles.inputContainer}>
                    <EditableImageInput
                      label={key}
                      name={key}
                      onChange={(e) => {
                        setFileToUpload(e)
                      }}
                      classCss={STYLES.FORMS.ITEM_ROW}
                      file={file}
                      onSave={(e) => updateProductDataAndSetStates(e, key)}
                    />
                  </div>
                ),
              )}
          </div>
        )}
      </div>
    </>
  )
}

export default EditableProductData
