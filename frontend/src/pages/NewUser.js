import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./newUser.module.scss"

const NewUser = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { translate } = useLocaleContext()
  const text = translate.pages.signUp
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
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt='logo'
            />
          </div>
          <form className={styles.form} onSubmit={createUser}>
            <label className={styles.label} htmlFor='firstName'>
              {text.firstName}
            </label>
            <input
              className={styles.formField}
              name='firstName'
              type='text'
              value={firstName}
              placeholder={text.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete='true'
              required
            ></input>
            <label className={styles.label} htmlFor='lastName'>
              {text.lastName}
            </label>
            <input
              className={styles.formField}
              name='lastName'
              type='text'
              value={lastName}
              placeholder={text.lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete='true'
              required
            ></input>
            <label className={styles.label} htmlFor='email'>
              {text.email}
            </label>
            <input
              className={styles.formField}
              type='email'
              value={email}
              placeholder={text.email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='true'
              required
            ></input>

            <label className={styles.label} htmlFor='password'>
              {text.password}
            </label>
            <input
              className={styles.formField}
              type='password'
              value={password}
              placeholder={text.password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='true'
              required
            ></input>

            <button className={styles.formButton} type='submit'>
              {text.submitButton}
            </button>
          </form>
        </div>

        <div className={styles.loginContainer}>
          <span>
            {text.haveAccount} <Link to='/login'>{text.login}</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default NewUser
