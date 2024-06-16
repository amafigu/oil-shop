import { ActionButton } from "@/components/ui/ActionButton"
import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { useTranslation } from "@/hooks/useTranslation"
import { User } from "@/types/User"
import { setFileToUpload } from "@/utils/setFileToUpload"
import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import styles from "./editableUserForm.module.scss"

interface EditableUserFormProps {
  item: User
  renderItemProps: string[]
  onSave: (args: {
    key: string
    id: number
    initialData: Partial<User>
    updatedData: Partial<User>
    setUpdatedData: Dispatch<SetStateAction<Partial<User>>>
    file?: File | null | undefined
  }) => void
  onDelete?: (event: MouseEvent<HTMLButtonElement>, id: number) => void
  file?: File | undefined | null
}

export const EditableUserForm: FC<EditableUserFormProps> = ({
  item,
  renderItemProps,
  onSave,
  onDelete,
}) => {
  const [updatedData, setUpdatedData] = useState<Partial<User>>({})
  const [file, setFile] = useState<File | undefined | null>(null)
  const { components } = useTranslation()
  const initialData: {
    firstName: string
    lastName: string
    email: string
    image: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = renderItemProps.reduce((acc: any, val: keyof User) => {
    acc[val] = item[val]
    return acc
  }, {} as Partial<User>)

  useEffect(() => {
    setUpdatedData(initialData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <article className={styles.wrapper} aria-label='Edit user'>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={updatedData.image || ""}
            alt='user'
          />
        </div>
        {onDelete && (
          <ActionButton
            action={(e) =>
              onDelete(e as MouseEvent<HTMLButtonElement>, item.id)
            }
            text={components.editableItem.deleteButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={"delete user"}
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
              type={"text"}
              file={file}
              key={key}
            />
          ))}
      </form>
    </article>
  )
}
