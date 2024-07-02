import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/userContext"
import { EditShippingData, ShippingData } from "@/types/User"
import { ChangeEvent, FC, useEffect, useState } from "react"
import styles from "./editableShippingDataForm.module.scss"

interface EditableShippingDataFormProps {
  item: ShippingData
}

export const EditableShippingDataForm: FC<EditableShippingDataFormProps> = ({
  item,
}) => {
  const initialData: EditShippingData = {
    street: item.street,
    number: item.number,
    details: item.details,
    postalCode: item.postalCode,
    city: item.city,
    state: item.state,
    country: item.country,
  }

  const [updatedData, setUpdatedData] = useState<EditShippingData>(initialData)
  const { onUpdateShippingData } = useUserContext()

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
                name={key}
                updatedPropertyData={updatedData}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setUpdatedData((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }}
                onSave={() =>
                  onUpdateShippingData({
                    key,
                    id: item.userId,
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
      }
    </article>
  )
}
