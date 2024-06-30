import { EditableItemInput } from "@/components/ui/EditableItemInput"
import { STYLES } from "@/constants/styles"
import { ShippingData } from "@/types/User"
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import styles from "./editableShippingDataForm.module.scss"

interface EditableShippingDataFormProps {
  item: ShippingData
  renderItemProps: string[]
  onSave: (args: {
    key: string
    id: number
    initialData: Partial<ShippingData>
    updatedData: Partial<ShippingData>
    setUpdatedData: Dispatch<SetStateAction<Partial<ShippingData>>>
  }) => void
}

export const EditableShippingDataForm: FC<EditableShippingDataFormProps> = ({
  item,
  renderItemProps,
  onSave,
}) => {
  const [updatedData, setUpdatedData] = useState<Partial<ShippingData>>({})
  const initialData: Partial<ShippingData> = renderItemProps.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any, val: keyof ShippingData) => {
      acc[val] = item[val]
      return acc
    },
    {} as Partial<ShippingData>,
  )

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
                  onSave({
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
