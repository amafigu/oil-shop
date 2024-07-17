import { FormInput } from "@/components/ui/FormInput"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { STYLES } from "@/constants/styles"
import { useTranslation } from "@/hooks/useTranslation"
import { CreateUser, User } from "@/types/User"
import { listenInput } from "@/utils/listenInput"
import { FC, FormEvent, useState } from "react"
import styles from "./createUserForm.module.scss"

interface CreateUserFormProps {
  onCreate: (e: FormEvent<HTMLFormElement>, data: CreateUser) => Promise<User>
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ onCreate }) => {
  const { components } = useTranslation()
  const [data, setData] = useState<CreateUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onCreate(e, data)
    setData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    })
  }

  return (
    <section className={styles.wrapper}>
      <form className={styles.form} onSubmit={submit}>
        {Object.keys(data).map((field) => (
          <FormInput
            key={field}
            name={field}
            onChangeListener={(e) => listenInput(e, data, setData)}
            placeholder={field}
            label={field}
            type='text'
            value={data[field as keyof CreateUser]?.toString() ?? ""}
          />
        ))}
        <div className={styles.button}>
          <SubmitButton
            text={components.createItem.submitButton}
            className={STYLES.BUTTONS.SAVE}
          />
        </div>
      </form>
    </section>
  )
}
