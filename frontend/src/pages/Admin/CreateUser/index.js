import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { emptyCreateUserObj } from "#constants/users"
import { useCountUsers } from "#hooks/useCountUsers"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  setFileToUpload,
} from "#utils/dataManipulation"
import { onCreateUser } from "#utils/users"
import { useState } from "react"
import styles from "./createUser.module.scss"

export const CreateUser = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState(null)
  const [file, setFile] = useState(null)

  const [userData, setUserData] = useState({
    ...emptyCreateUserObj,
  })
  const { components } = useTranslation()
  const { setCounter } = useCountUsers()
  const t = components.createUserForm

  return (
    <section aria-label='create product form'>
      {notification && <NotificationCard message={notification} />}
      <ToggleButton
        isVisible={isVisible}
        onToggle={setIsVisible}
        hideBtnText={t.hideButton.toUpperCase()}
        showBtnText={t.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {isVisible && (
        <form className={styles.form}>
          {Object.keys(userData).map((field) => (
            <FormInput
              classCss={STYLES.FORMS.FIELD}
              key={field}
              name={field}
              onChangeListener={
                field === "image"
                  ? (e) => setFileToUpload(e, setFile)
                  : (e) =>
                      listenInputChangeAndSetDataObject(
                        e,
                        userData,
                        setUserData,
                        setNotification,
                      )
              }
              placeholder={field}
              label={field}
              type={field === "image" && "file"}
              value={userData[field]}
            />
          ))}
          <ActionButton
            action={(e) => {
              onCreateUser(e, userData, setNotification, file, setCounter)
            }}
            text={t.submitButton}
            className={STYLES.BUTTONS.ACTION}
          />
        </form>
      )}
    </section>
  )
}
