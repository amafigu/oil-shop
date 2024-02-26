import { useLoginAndRedirect } from "#hooks/useLoginAndRedirect"
import { useTranslation } from "#hooks/useTranslation"
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./loginForm.module.scss"

export const LoginForm = () => {
  const { translate } = useTranslation()
  const text = translate.pages.login
  const textPassword = translate.components.crud
  const {
    loginUserAndSetState,
    setEmail,
    setPassword,
    setShowPassword,
    showPassword,
    password,
    email,
  } = useLoginAndRedirect()

  return (
    <form className={styles.form} onSubmit={loginUserAndSetState}>
      <input
        className={styles.formField}
        type='email'
        value={email}
        placeholder={text.emailPlaceholder}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete='true'
        name='email'
        required
      ></input>

      <div className={styles.passwordInputAndToggleButtonContainer}>
        <input
          className={styles.formField}
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder={textPassword.forms.commonProperties.password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='true'
          name='password'
          required
        ></input>

        <button
          aria-label='show password'
          type='button'
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={getIconByName("faUnlock")} />
          ) : (
            <FontAwesomeIcon icon={getIconByName("faLock")} />
          )}
        </button>
      </div>
      <button
        className={styles.formButton}
        type='submit'
        aria-label='submit login data'
      >
        {text.loginButton}
      </button>
    </form>
  )
}
