import { ActionButton } from "@/components/ui/ActionButton"
import { FormInput } from "@/components/ui/FormInput"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { STYLES } from "@/constants/styles"
import { useLogin } from "@/hooks/useLogin"
import { useTranslation } from "@/hooks/useTranslation"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, FormEvent, useState } from "react"
import styles from "./loginForm.module.scss"

export const LoginForm: FC = () => {
  const { translate } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setLoggedUser } = useLogin()
  const text = translate.pages.login

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await setLoggedUser(e, email, password)
  }
  return (
    <>
      <form className={styles.form} onSubmit={submitLogin}>
        <FormInput
          name={"email"}
          value={email}
          onChangeListener={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          label={"email"}
          type={"email"}
        />
        <div className={styles.container}>
          <FormInput
            name={"password"}
            value={password}
            onChangeListener={(e) => setPassword(e.target.value)}
            placeholder={"password"}
            label={"password"}
            type={showPassword ? "text" : "password"}
          />
          <ActionButton
            action={() => setShowPassword((prevState) => !prevState)}
            text={
              showPassword ? (
                <FontAwesomeIcon icon={getIconByName("faUnlock")} />
              ) : (
                <FontAwesomeIcon icon={getIconByName("faLock")} />
              )
            }
            className={""}
          />
        </div>
        <SubmitButton
          text={text.loginButton}
          className={STYLES.BUTTONS.LOGIN}
        />
      </form>
    </>
  )
}
