import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import style from "./login.module.scss"
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
            } else {
              navigate("/users/current-user")
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
    <div className=''>
      <div className=''>
        <div className={style.pageTitle}>
          {text.title}
          <form onSubmit={login}>
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
            <button type='submit'>login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
