import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import {
  listenInputChangeAndSetDataObject,
  setFileToUpload,
} from "#utils/dataManipulation"
import { useState } from "react"
import { OptionsFormInput } from "./OptionsFormInput"

import styles from "./createItem.module.scss"

export const CreateItem = ({
  onCreate,
  onChange,
  setCounter,
  renderItemProps,
  itemCategories,
}) => {
  const initialItemData = renderItemProps.reduce((acc, val) => {
    acc[val] = ""
    return acc
  }, {})

  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState(null)
  const [file, setFile] = useState(null)

  const [itemData, setItemData] = useState({
    ...initialItemData,
  })
  const { components } = useTranslation()
  console.log(itemData)
  return (
    <section aria-label='create item form'>
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
          {Object.keys(itemData).map((field) =>
            field !== "productCategoryId" ? (
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
            ) : (
              <OptionsFormInput
                itemData={itemData}
                setItemData={setItemData}
                onChange={listenInputChangeAndSetDataObject}
                setNotification={setNotification}
                itemCategories={itemCategories}
                property={"productCategoryId"}
              />
            ),
          )}
          <ActionButton
            action={async (e) => {
              await onCreate(e, itemData, setNotification, file, setCounter)
              setItemData({ ...initialItemData })
            }}
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.ACTION}
          />
        </form>
      )}
    </section>
  )
}
