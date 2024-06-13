import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import { STYLES } from "#constants/styles"
import { useNotificationContext } from "#context/notificationContext"
import { useTranslation } from "#hooks/useTranslation"
import { listenInput } from "#utils/listenInput"
import { useState } from "react"
import styles from "./createUserForm.module.scss"

export const CreateUserForm = ({ onCreate }) => {
  const { setNotification } = useNotificationContext()
  const { components } = useTranslation()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  return (
    <section aria-label='Create user form'>
      <form className={styles.container}>
        {Object.keys(data).map((field) => (
          <FormInput
            classCss={STYLES.FORMS.FIELD}
            key={field}
            name={field}
            onChangeListener={(e) =>
              listenInput(e, data, setData, setNotification)
            }
            placeholder={field}
            label={field}
            type='text'
            value={data[field]}
          />
        ))}
        <div className={styles.button}>
          <ActionButton
            action={async (e) => {
              await onCreate(e, data)
              setData({ ...data })
            }}
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.ACTION}
            ariaLabel={components.createItem.submitButton}
          />
        </div>
      </form>
    </section>
  )
}
