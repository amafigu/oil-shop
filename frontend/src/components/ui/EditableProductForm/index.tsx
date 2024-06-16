import { ActionButton } from "@/components/ui/ActionButton"
import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { useTranslation } from "@/hooks/useTranslation"
import { Product } from "@/types/Product"
import { setFileToUpload } from "@/utils/setFileToUpload"
import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import styles from "./editableProductForm.module.scss"

interface EditableProductFormProps {
  item: Product
  renderItemProps: string[]
  onSave: (args: {
    key: string
    id: number
    initialData: Partial<Product>
    updatedData: Partial<Product>
    setUpdatedData: Dispatch<SetStateAction<Partial<Product>>>
    file?: File | null | undefined
  }) => void
  onDelete: (event: MouseEvent<HTMLButtonElement>, id: number) => void
  file?: File | null | undefined
}

export const EditableProductForm: FC<EditableProductFormProps> = ({
  item,
  renderItemProps,
  onSave,
  onDelete,
}) => {
  const [updatedData, setUpdatedData] = useState<Partial<Product>>({})
  const [file, setFile] = useState<File | undefined | null>(null)
  const { components } = useTranslation()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialData = renderItemProps.reduce((acc: any, val: keyof Product) => {
    acc[val] = item[val]
    return acc
  }, {})

  useEffect(() => {
    setUpdatedData(initialData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <article className={styles.wrapper} aria-label='Edit product'>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedData.image || ""}
            alt='product'
          />
        </div>
        {onDelete && (
          <ActionButton
            action={(e) => onDelete(e, item.id)}
            text={components.editableItem.deleteButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={"delete product"}
          />
        )}
      </div>
      <form className={styles.item}>
        {item &&
          initialData &&
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
                      onSave({
                        key,
                        id: item.id,
                        initialData,
                        updatedData,
                        setUpdatedData,
                        file,
                      })
                  : () =>
                      onSave({
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
