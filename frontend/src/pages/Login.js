import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./login.module.scss"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { translate } = useLocaleContext()
  const text = translate.pages.login
  const navigate = useNavigate()

  useEffectScrollTop()

  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email, password },
        { withCredentials: true },
      )
      if (response) {
        const getUser = async () => {
          try {
            const responseUser = await axios.get(
              `${process.env.REACT_APP_API_URL}/users/current-user`,
              { withCredentials: true },
            )

            const userRole = responseUser.data.role

            if (userRole === "admin") {
              navigate("/users/current-admin")
            } else if (userRole === "guest") {
              navigate("/users/current-user")
            } else {
              navigate("/login")
            }
          } catch (error) {
            console.error("Error fetching user data", error)
          }
        }

        getUser()
      }
    } catch (error) {
      console.error("Login error", error)
    }
  }

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.loginPage}>
        <div className={styles.formContainer}>
          <div className={styles.containerTitle}>{text.title}</div>

          <form className={styles.form} onSubmit={login}>
            <label className={styles.label} htmlFor='email'>
              {text.email}
            </label>
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
            <label className={styles.label} htmlFor='password'>
              {text.password}
            </label>
            <input
              type='password'
              value={password}
              placeholder={text.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='true'
              name='email'
              required
              className={styles.formField}
            ></input>
            <button className={styles.formButton} type='submit'>
              {text.loginButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
