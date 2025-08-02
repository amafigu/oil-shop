import { ItemFormInput } from "@/components/ui/ItemFormInput"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/useUserContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditUser, User } from "@/types/User"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import { ActionButton } from "../ActionButton"
import styles from "./userForm.module.scss"

interface UserFormProps {
  item: User
  setShowForm?: Dispatch<SetStateAction<boolean>>
}

export const UserForm: FC<UserFormProps> = ({ item, setShowForm }) => {
  const initialData: EditUser = {
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
  }
  const [updatedData, setUpdatedData] = useState<EditUser>(initialData)
  const { onUpdateUser } = useUserContext()
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
      <div className={styles.header}>
        <span className={styles.title}>{components.userForm.title}</span>
        {setShowForm && (
          <ActionButton
            className={STYLES.BUTTONS.CLOSE_MODAL}
            action={() => setShowForm(false)}
            text={<FontAwesomeIcon icon={getIconByName("faX")} size='lg' />}
          />
        )}
      </div>
      <div className={styles.info}>{components.userForm.info}</div>
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
        {setShowForm && (
          <ActionButton
            action={() => setShowForm(false)}
            className={STYLES.BUTTONS.CANCEL}
            text={components.userForm.cancel}
          />
        )}
        <ActionButton
          action={() => submit()}
          className={STYLES.BUTTONS.SAVE}
          text={components.userForm.save}
        />
      </div>
    </article>
  )
}
