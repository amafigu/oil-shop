import { EditableItemInput } from "#components/ui/EditableItemInput"
import { STYLES } from "#constants/styles"
import { useEffect, useState } from "react"
import styles from "./editableShippingData.module.scss"

export const EditableShippingData = ({ item, renderItemProps, onSave }) => {
  const [updatedData, setUpdatedData] = useState({})
  const initialData = renderItemProps.reduce((acc, val) => {
    acc[val] = item[val]
    return acc
  }, {})

  useEffect(() => {
    setUpdatedData(initialData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <article className={styles.wrapper} aria-label='Edit shipping data'>
      {
        <form className={styles.item}>
          {item &&
            initialData &&
            Object.keys(initialData).map((key) => (
              <EditableItemInput
                label={key}
                name={key}
                updatedPropertyData={updatedData}
                onChange={(e) => {
                  setUpdatedData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }}
                onSave={(e) =>
                  onSave(
                    e,
                    key,
                    item.id,
                    initialData,
                    updatedData,
                    setUpdatedData,
                  )
                }
                classCss={STYLES.FORMS.FIELD}
                type={"text"}
                file={""}
                key={key}
              />
            ))}
        </form>
      }
    </article>
  )
}
