import EditableImageInput from "#components/EditableImageInput"
import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import {
  API_PRODUCTS_PRODUCT,
  DEFAULT_PRODUCT_IMAGE,
  STYLES,
} from "#utils/constants"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import axios from "axios"
import { useState } from "react"
import styles from "./editableListProductData.module.scss"

const EditableListProductData = ({ setRefreshAllProductsCounter, product }) => {
  const initialProductData = {
    name: "",
    description: "",
    price: "",
    image: "",
    size: "",
  }

  const [nonUpdatedProductData, setNonUpdatedProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    size: product.size,
  })

  const [updatedProductData, setUpdatedProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    size: product.size,
  })

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
      product.id,
      API_PRODUCTS_PRODUCT,
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

  const deleteProductAndUpdateState = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}${API_PRODUCTS_PRODUCT}/${id}`,
        {
          withCredentials: true,
        },
      )
      setNotification(`Product deleted`)
      setTimeout(() => setNotification(null), 2000)
      setTimeout(
        () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
        2300,
      )
    } catch (error) {
      setNotification(`Product not deleted`)
      setTimeout(() => setNotification(null), 3000)
      console.error("Can not delete product", error)
    }
  }
  console.log(product)
  return (
    <>
      <div className={styles.editableProductDataWrapper}>
        {notification && <NotificationCard message={notification} />}
        <div className={styles.imageAndButtonContainer}>
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
          <button
            className={styles.formButton}
            onClick={() =>
              deleteProductAndUpdateState(
                product.id,
                setNotification,
                textAdminCrud.users.deletedByEmail,
                textAdminCrud.users.deleteError,
              )
            }
          >
            {buttonsText.crud.deleteProduct.button}
          </button>
        </div>

        <div className={styles.formContainer}>
          {Object.keys(initialProductData).map((key) =>
            key !== "image" ? (
              <div className={styles.inputContainer} key={key}>
                {updatedProductData[key] !== undefined && (
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
      </div>
    </>
  )
}

export default EditableListProductData
