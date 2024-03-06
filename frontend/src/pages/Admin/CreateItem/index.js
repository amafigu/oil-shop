import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { setFileToUpload } from "#utils/dataManipulation"
import { useState } from "react"
import styles from "./createItem.module.scss"

export const CreateItem = ({
  onCreate,
  onChange,
  setCounter,
  renderItemProps,
}) => {
  const itemInitialAttributes = renderItemProps.reduce((acc, val) => {
    acc[val] = ""
    return acc
  }, {})

  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState(null)
  const [file, setFile] = useState(null)

  const [itemData, setItemData] = useState({
    ...itemInitialAttributes,
  })
  const { components } = useTranslation()

  return (
    <section aria-label='create product form'>
      {notification && <NotificationCard message={notification} />}
      <ToggleButton
        isVisible={isVisible}
        onToggle={setIsVisible}
        hideBtnText={components.createItem.hideButton.toUpperCase()}
        showBtnText={components.createItem.showButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      {isVisible && (
        <form className={styles.form}>
          {Object.keys(itemData).map((field) => (
            <FormInput
              classCss={STYLES.FORMS.FIELD}
              key={field}
              name={field}
              onChangeListener={
                field === "image"
                  ? (e) => setFileToUpload(e, setFile)
                  : (e) => onChange(e, itemData, setItemData, setNotification)
              }
              placeholder={field}
              label={field}
              type={field === "image" && "file"}
              value={itemData[field]}
            />
          ))}
          <ActionButton
            action={(e) => {
              onCreate(e, itemData, setNotification, file, setCounter)
            }}
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.ACTION}
          />
        </form>
      )}
    </section>
  )
}
