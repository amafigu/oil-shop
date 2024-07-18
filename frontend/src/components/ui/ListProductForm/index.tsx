import { uploadFile } from "@/api/aws/uploadFile"
import { ItemFormInput } from "@/components/ui/ItemFormInput"
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media"
import { STYLES } from "@/constants/styles"
import { useProductContext } from "@/context/productContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditProduct, Product } from "@/types/Product"
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import { ActionButton } from "../ActionButton"
import styles from "./listProductForm.module.scss"

interface ListProductProps {
  item: Product
  setShowForm?: Dispatch<SetStateAction<boolean>>
}

export const ListProductForm: FC<ListProductProps> = ({
  item,
  setShowForm,
}) => {
  const initialData: EditProduct = {
    name: item.name,
    description: item.description,
    size: item.size,
    price: item.price,
    details: item.details,
    image: item.image,
    brand: item.brand,
  }

  const [updatedData, setUpdatedData] = useState<EditProduct>(initialData)
  const [file, setFile] = useState<File | null>(null)
  const { onUpdateProduct, onDeleteProduct } = useProductContext()
  const { components } = useTranslation()

  const submit = async () => {
    const dataToUpdate = {
      ...updatedData,
      size: Number(updatedData.size),
      price: Number(updatedData.price),
    }
    if (file) {
      const imageUrl = await uploadFile(file)
      if (imageUrl) {
        dataToUpdate.image = imageUrl
      }
    }

    await onUpdateProduct({
      id: item.id,
      initialData,
      updatedData: dataToUpdate,
      setUpdatedData,
    })

    if (setShowForm) {
      setShowForm(false)
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "image" && files && files.length > 0) {
      setFile(files[0] || null)
    } else {
      setUpdatedData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  return (
    <article className={styles.wrapper} aria-label='Edit Product'>
      <form className={styles.form}>
        {Object.keys(initialData).map((key) => (
          <ItemFormInput
            name={key}
            updatedPropertyData={updatedData}
            onChange={onInputChange}
            type={key === "image" ? "file" : "text"}
            key={key}
          />
        ))}
      </form>
      <div className={styles.container}>
        {item && (
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={
                file
                  ? URL.createObjectURL(file)
                  : item.image || DEFAULT_PRODUCT_IMAGE
              }
              alt='Product Image'
            />
          </div>
        )}
        <div className={styles.buttonsContainer}>
          <ActionButton
            action={() => submit()}
            className={STYLES.BUTTONS.SAVE_ITEM}
            text={components.listUserForm.save}
          />
          <ActionButton
            action={(e) => onDeleteProduct(e, item.id)}
            className={STYLES.BUTTONS.DELETE_ITEM}
            text={components.listUserForm.delete}
          />
        </div>
      </div>
    </article>
  )
}
