import { ActionButton } from "@/components/ui/ActionButton"
import { FormInput } from "@/components/ui/FormInput"
import { STYLES } from "@/constants/styles"
import { useTranslation } from "@/hooks/useTranslation"
import { User } from "@/types/User"
import { ChangeEvent, FC, SyntheticEvent, useState } from "react"
import styles from "./createUserForm.module.scss"

interface CreateUserFormProps {
  onCreate: (e: SyntheticEvent, data: Partial<User>) => Promise<Partial<User>>
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ onCreate }) => {
  const { components } = useTranslation()
  const [data, setData] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <section aria-label='Create user form'>
      <form className={styles.container}>
        {Object.keys(data).map((field) => (
          <FormInput
            classCss={STYLES.FORMS.FIELD}
            key={field}
            name={field}
            onChangeListener={handleInputChange}
            placeholder={field}
            label={field}
            type='text'
            value={data[field as keyof User]?.toString() ?? ""}
          />
        ))}
        <div className={styles.button}>
          <ActionButton
            action={async (e) => {
              await onCreate(e, data)
              setData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              })
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
