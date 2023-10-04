import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./newUser.module.scss"

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

      console.log(process.env.REACT_APP_API_URL)
      console.log(firstName, lastName, email, password)
    } catch (error) {
      console.log(typeof password)
      console.log(password)
      console.log(email)

      console.error("Signup error", error)
    }
  }

  return (
    <div className=''>
      <div className=''>
        <div className={style.pageTitle}>
          {text.title}
          <form onSubmit={createUser}>
            <input
              type='text'
              value={firstName}
              placeholder={"first name"}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete='true'
            ></input>
            <input
              type='text'
              value={lastName}
              placeholder={"last name"}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete='true'
            ></input>
            <input
              type='email'
              value={email}
              placeholder={text.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='true'
            ></input>
            <input
              type='password'
              value={password}
              placeholder={text.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='true'
            ></input>

            <button type='submit'>Sign Up</button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default NewUser
