import { ActionButton } from "@/components/ui/ActionButton"
import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { useProductContext } from "@/context/productContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditProduct, Product } from "@/types/Product"
import { setFileToUpload } from "@/utils/setFileToUpload"
import { FC, MouseEvent, useState } from "react"
import styles from "./editableProductForm.module.scss"

interface EditableProductFormProps {
  item: Product
  file?: File | null | undefined
}

export const EditableProductForm: FC<EditableProductFormProps> = ({ item }) => {
  const initialData: EditProduct = {
    name: item.name,
    description: item.description,
    price: item.price,
    details: item.details,
    size: item.size,
    image: item.image,
    brand: item.brand,
  }
  const [updatedData, setUpdatedData] = useState<EditProduct>(initialData)
  const [file, setFile] = useState<File | undefined | null>(null)
  const { components } = useTranslation()
  const { onDeleteProduct, onUpdateProduct } = useProductContext()

  return (
    <article className={styles.wrapper} aria-label='update product'>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedData.image || ""}
            alt='product'
          />
        </div>
        <ActionButton
          action={(e) =>
            onDeleteProduct(e as MouseEvent<HTMLButtonElement>, item.id)
          }
          text={components.editableItem.deleteButton}
          className={STYLES.BUTTONS.ACTION}
        />
      </div>
      <form className={styles.item}>
        {item &&
          Object.keys(initialData).map((key) => (
            <EditableItemInput
              name={key}
              updatedPropertyData={updatedData}
              onChange={(e) => {
                if (key === "image") {
                  setFileToUpload(e, setFile)
                } else {
                  setUpdatedData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              }}
              onSave={
                key === "image"
                  ? () =>
                      onUpdateProduct({
                        key,
                        id: item.id,
                        initialData,
                        updatedData,
                        setUpdatedData,
                        file,
                      })
                  : () =>
                      onUpdateProduct({
                        key,
                        id: item.id,
                        initialData,
                        updatedData,
                        setUpdatedData,
                      })
              }
              classCss={STYLES.FORMS.FIELD}
              type='text'
              file={file}
              key={key}
            />
          ))}
      </form>
    </article>
  )
}
