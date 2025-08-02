import { ItemFormInput } from "@/components/ui/ItemFormInput"
import { STYLES } from "@/constants/styles"
import { useUserContext } from "@/context/useUserContext"
import { useTranslation } from "@/hooks/useTranslation"
import { EditShippingData, ShippingData } from "@/types/User"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import { ActionButton } from "../ActionButton"
import styles from "./shippingDataForm.module.scss"

interface ShippingDataFormProps {
  item: ShippingData
  setShowForm?: Dispatch<SetStateAction<boolean>>
}

export const ShippingDataForm: FC<ShippingDataFormProps> = ({
  item,
  setShowForm,
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
  const { components } = useTranslation()

  const submit = async () => {
    await onUpdateShippingData({
      id: item.userId,
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
        <span className={styles.title}>
          {components.shippingDataForm.title}
        </span>
        {setShowForm && (
          <ActionButton
            className={STYLES.BUTTONS.CLOSE_MODAL}
            action={() => setShowForm(false)}
            text={<FontAwesomeIcon icon={getIconByName("faX")} size='lg' />}
          />
        )}
      </div>
      <div className={styles.info}>{components.shippingDataForm.info}</div>
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
            text={components.shippingDataForm.cancel}
          />
        )}

        <ActionButton
          action={() => submit()}
          className={STYLES.BUTTONS.SAVE}
          text={components.shippingDataForm.save}
        />
      </div>
    </article>
  )
}
