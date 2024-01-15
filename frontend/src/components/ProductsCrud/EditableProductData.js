import EditableImageInput from "#components/EditableImageInput"
import EditableInput from "#components/EditableInput"
import NotificationCard from "#components/NotificationCard"
import ToggleButton from "#components/ToggleButton"
import useLocaleContext from "#context/localeContext"
import {
  API_PRODUCTS_PRODUCT,
  DEFAULT_PRODUCT_IMAGE,
  SHORT_MESSAGE_TIMEOUT,
  STYLES,
} from "#utils/constants"
import {
  listenInputChangeAndSetDataObject,
  updateDataAndSetStates,
  uploadToS3,
} from "#utils/dataManipulation"
import { deleteProductById, getProductByName } from "#utils/products"
import { useState } from "react"
import styles from "./editableProductData.module.scss"

const EditableProductData = ({
  refreshAllProductsCounter,
  setRefreshAllProductsCounter,
}) => {
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
  const [file, setFile] = useState(null)
  const [notification, setNotification] = useState(null)
  const [productName, setProductName] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)

  const { translate } = useLocaleContext()
  const textAdminCrud = translate.pages.admin.crud

  const updateProductDataAndSetStates = async (e, propertyName) => {
    let image = ""

    if (file) {
      image = await uploadToS3(file)
    }

    let updatedProductDataWithImage = { ...updatedProductData, image }
    setUpdatedProductData(updatedProductDataWithImage)

    const updatedData = await updateDataAndSetStates(
      e,
      propertyName,
      nonUpdatedProductData.id,
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
    setTimeout(
      () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
      2300,
    )
  }

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const searchProduct = async (name) => {
    const productResponse = await getProductByName(name.trim())
    if (!productResponse) {
      setNotification("Product not found")
      setNonUpdatedProductData({ ...initialProductData })

      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      return
    }
    setNonUpdatedProductData(productResponse.data)
    setShowProductForm(true)
  }

  const deleteProductAndUpdateState = async (productId) => {
    try {
      const deleteResponse = await deleteProductById(productId)
      if (deleteResponse.status === 200) {
        setNotification(`product deleted`)
        setNonUpdatedProductData({ ...initialProductData })
        setProductName("")
        setShowProductForm(false)
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        setTimeout(
          () => setRefreshAllProductsCounter((prevCounter) => prevCounter + 1),
          SHORT_MESSAGE_TIMEOUT,
        )
      }
    } catch (error) {
      setNotification(`${productName} not deleted`)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
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
                  {"GET"}
                </button>
              </div>

              <button
                className={styles.formButton}
                onClick={() =>
                  deleteProductAndUpdateState(nonUpdatedProductData.id)
                }
              >
                {"DELETE"}
              </button>
            </div>
            {showProductForm &&
              Object.keys(initialProductData).map((key) =>
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
                  <div className={styles.inputContainer} key={key}>
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
