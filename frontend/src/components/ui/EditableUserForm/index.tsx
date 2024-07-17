import { ActionButton } from "@/components/ui/ActionButton"
import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/userContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditUser, User } from "@/types/User"
import { FC, MouseEvent, useState } from "react"
import styles from "./editableUserForm.module.scss"

interface EditableUserFormProps {
  item: User
}

export const EditableUserForm: FC<EditableUserFormProps> = ({ item }) => {
  const initialData: EditUser = {
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
  }
  const [updatedData, setUpdatedData] = useState<EditUser>(initialData)
  const { components } = useTranslation()
  const { onUpdateUser, onDeleteUser } = useUserContext()

  return (
    <article className={styles.wrapper} aria-label='Edit user'>
      <div className={styles.container}>
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
                setUpdatedData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }}
              onSave={() =>
                onUpdateUser({
                  id: item.id,
                  initialData,
                  updatedData,
                  setUpdatedData,
                })
              }
              classCss={STYLES.FORMS.FIELD}
              type={"text"}
              key={key}
            />
          ))}
      </form>
    </article>
  )
}
