import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import NotificationCard from "#components/ui/NotificationCard"
import { STYLES } from "#constants/styles"
import { useTranslation } from "#hooks/useTranslation"
import { listenInputChangeAndSetDataObject } from "#utils/listenInputChangeAndSetDataObject"
import { setFileToUpload } from "#utils/setFileToUpload"
import { useState } from "react"
import { OptionsFormInput } from "./OptionsFormInput"
import styles from "./createItem.module.scss"

export const CreateItem = ({
  onCreate,
  onChange,
  renderItemProps,
  itemCategories,
}) => {
  const initialItemData = renderItemProps.reduce((acc, val) => {
    acc[val] = ""
    return acc
  }, {})
  const [notification, setNotification] = useState(null)
  const [file, setFile] = useState(null)
  const [itemData, setItemData] = useState({
    ...initialItemData,
  })
  const { components } = useTranslation()

  return (
    <section aria-label='create item form'>
      {notification && <NotificationCard message={notification} />}
      <form className={styles.container}>
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
              type={field === "image" ? "image" : "text"}
              value={itemData[field]}
            />
          ) : (
            <OptionsFormInput
              key={field}
              itemData={itemData}
              setItemData={setItemData}
              onChange={listenInputChangeAndSetDataObject}
              setNotification={setNotification}
              itemCategories={itemCategories}
              property={"productCategoryId"}
            />
          ),
        )}
        <div className={styles.button}>
          <ActionButton
            action={async (e) => {
              await onCreate(e, itemData, setNotification, file)
              setItemData({ ...initialItemData })
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
