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

  const { translate, components } = useTranslation()
  const { setCounter } = useCountUsers()
  const text = translate.components.crud
  const t = components.createProductForm

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
        <form
          className={styles.form}
          onSubmit={(e) => {
            onCreateUser(e, userData, setNotification, file, setCounter)
          }}
        >
          {Object.keys(userData).map((field) =>
            field !== "image" && field !== "productCategoryId" ? (
              <FormInput
                classCss={STYLES.FORMS.FIELD}
                key={field}
                name={field}
                onChangeListener={(e) =>
                  listenInputChangeAndSetDataObject(
                    e,
                    userData,
                    setUserData,
                    setNotification,
                  )
                }
                placeholder={field}
                label={field}
                type='text'
                value={userData[field]}
              />
            ) : (
              <div className={styles.labelAndInputContainer} key={field}>
                <span className={styles.label}>
                  {file ? "Selected file: " : "Select a file"}
                </span>
                <label className={styles.labelForFile} htmlFor='fileInput'>
                  {file ? file.name : "Search on device"}
                </label>

                <input
                  key={field}
                  type='file'
                  name='image'
                  id='fileInput'
                  onChange={(e) => setFileToUpload(e, setFile)}
                  required
                />
              </div>
            ),
          )}
          <button className={styles.formButton} type='submit'>
            {text.forms.createUserForm.submitButton}
          </button>
        </form>
      )}
    </section>
  )
}
