import { ItemFormInput } from "@/components/ui/ItemFormInput"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/useUserContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditUser, User } from "@/types/User"
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import { ActionButton } from "../ActionButton"
import styles from "./listUserForm.module.scss"

interface ListUserProps {
  item: User
  setShowForm?: Dispatch<SetStateAction<boolean>>
}

export const ListUserForm: FC<ListUserProps> = ({ item, setShowForm }) => {
  const initialData: EditUser = {
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
  }
  const [updatedData, setUpdatedData] = useState<EditUser>(initialData)
  const { onUpdateUser, onDeleteUser } = useUserContext()
  const { components } = useTranslation()

  const submit = async () => {
    await onUpdateUser({
      id: item.id,
      initialData,
      updatedData,
      setUpdatedData,
    })
    if (setShowForm) {
      setShowForm(false)
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <article className={styles.wrapper} aria-label='Edit user'>
      <form className={styles.form}>
        {item &&
          Object.keys(initialData).map((key) => (
            <ItemFormInput
              name={key}
              updatedPropertyData={updatedData}
              onChange={onInputChange}
              type={"text"}
              key={key}
            />
          ))}
      </form>
      <div className={styles.buttonsContainer}>
        <ActionButton
          action={() => submit()}
          className={STYLES.BUTTONS.SAVE_ITEM}
          text={components.listUserForm.save}
        />
        <ActionButton
          action={(e) => onDeleteUser(e, item.id)}
          className={STYLES.BUTTONS.DELETE_ITEM}
          text={components.listUserForm.delete}
        />
      </div>
    </article>
  )
}
