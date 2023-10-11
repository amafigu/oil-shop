import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./newUser.module.scss"

const NewUser = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { translate } = useLocaleContext()
  const text = translate.pages.login
  const navigate = useNavigate()
  useEffectScrollTop()

  const createUser = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, {
        firstName,
        lastName,
        email,
        password,
      })

      navigate("/users/current-user")
    } catch (error) {
      console.error("Signup error", error)
    }
  }

  return (
    <div className={styles.newUserPageWrapper}>
      <div className={styles.newUserPage}>
        <div className={styles.containerTitle}>
          {text.title}
          <form className={styles.form} onSubmit={createUser}>
            <label className={styles.label} htmlFor='name'></label>
            <input
              className={styles.formField}
              name='firstName'
              type='text'
              value={firstName}
              placeholder={"first name"}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete='true'
              required
            ></input>
            <input
              className={styles.formField}
              name='lastName'
              type='text'
              value={lastName}
              placeholder={"last name"}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete='true'
              required
            ></input>
            <input
              className={styles.formField}
              type='email'
              value={email}
              placeholder={text.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='true'
              required
            ></input>
            <input
              className={styles.formField}
              type='password'
              value={password}
              placeholder={text.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='true'
              required
            ></input>

            <button className={styles.formButton} type='submit'>
              Sign Up
            </button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default NewUser
