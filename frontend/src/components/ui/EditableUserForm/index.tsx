import { ActionButton } from "@/components/ui/ActionButton"
import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditUser, User } from "@/types/User"
import { setFileToUpload } from "@/utils/setFileToUpload"
import { FC, MouseEvent, useState } from "react"
import styles from "./editableUserForm.module.scss"

interface EditableUserFormProps {
  item: User
  file?: File | null | undefined
}

export const EditableUserForm: FC<EditableUserFormProps> = ({ item }) => {
  const initialData: EditUser = {
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    image: item.image,
  }
  const [updatedData, setUpdatedData] = useState<EditUser>(initialData)
  const [file, setFile] = useState<File | undefined | null>(null)
  const { components } = useTranslation()

  const { onUpdateUser, onDeleteUser } = useUserContext()
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

        <ActionButton
          action={(e) =>
            onDeleteUser(e as MouseEvent<HTMLButtonElement>, item.id)
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
                      onUpdateUser({
                        key,
                        id: item.id,
                        initialData,
                        updatedData,
                        setUpdatedData,
                        file,
                      })
                  : () =>
                      onUpdateUser({
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
