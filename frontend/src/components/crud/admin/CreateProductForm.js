import NotificationCard from "#components/NotificationCard"
import useLocaleContext from "#context/localeContext"
import { titleCase } from "#utils/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./createProductForm.module.scss"

const CreateProductForm = () => {
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

  console.log(productCategories)

  const listenInputChange = (e) => {
    let valueToCheck = e.target.value

    console.log("listenInputChange a ", valueToCheck)
    if (e.target.type === "number" || e.target.name === "productCategoryId") {
      valueToCheck = Number(e.target.value)

      console.log("listenInputChange b ", valueToCheck)
    }

    setProductData({ ...productData, [e.target.name]: valueToCheck })
    console.log("listenInputChange productData ", productData)
  }

  const setFileToUpload = (e) => {
    setFile(e.target.files[0])
  }

  const uploadToS3 = async () => {
    console.log(file)
    let newUrl = ""
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/aws/generate-upload-url?fileName=${file.name}`,
      )
      newUrl = `https://oylo-images.s3.us-east-2.amazonaws.com/${response.data.fileName}`
      console.log(response.data)
      console.log(response.data.uploadURL)
      console.log(response.data.fileName)

      // MY PROBLEM IS HERE

      await axios.put(response.data.uploadURL, file, {
        headers: {
          "Content-Type": file.type,
        },
      })
    } catch (error) {
      console.log(error)
      console.error("Error uploading to S3: ", error)
      return null
    }
    return newUrl
  }

  const submitProductForm = async (e) => {
    e.preventDefault()

    const imageUrl = await uploadToS3()
    console.log(imageUrl)

    if (!imageUrl) {
      console.log(" !img") // HERE I GET ALWAYS UNDEFINED
      console.error("!imageUrlFailed to upload image to S3")

      return
    }
    const productDataWithImage = {
      ...productData,
      image: imageUrl,
    }
    console.log(productDataWithImage)

    try {
      console.log()
      console.log(productDataWithImage)
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/create`,
        productDataWithImage,
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
        <div className={styles.actionButton}>
          <button className={styles.formButton} type='submit'>
            {text.forms.createProductForm.submitButton}
          </button>
        </div>
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
            >
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
            <label className={styles.label} htmlFor='image'>
              {text.forms.commonProperties.imageUrl}
            </label>
            <input
              className={styles.formField}
              type='file'
              name='image'
              onChange={setFileToUpload}
              required
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProductForm
