import { ActionButton } from "#components/ui/ActionButton"
import { FormInput } from "#components/ui/FormInput"
import { STYLES } from "#constants/styles"
import { useLogin } from "#hooks/useLogin"
import { useTranslation } from "#hooks/useTranslation"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import styles from "./loginForm.module.scss"

export const LoginForm = () => {
  const { translate } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setLoggedUser } = useLogin()
  const text = translate.pages.login

  return (
    <>
      <form className={styles.form}>
        <FormInput
          classCss={STYLES.FORMS.FIELD}
          name={"email"}
          value={email}
          onChangeListener={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          label={"email"}
          type={"email"}
        />
        <div className={styles.container}>
          <FormInput
            classCss={STYLES.FORMS.FIELD}
            name={"email"}
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
            classCss={""}
            ariaLabel={"show password"}
          />
        </div>
        <ActionButton
          action={(e) => setLoggedUser(e, email, password)}
          text={text.loginButton}
          className={STYLES.BUTTONS.WIDE}
          ariaLabel={"confirm login"}
        />
      </form>
    </>
  )
}
