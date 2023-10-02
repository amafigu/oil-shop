import useLocaleContext from "#context/localeContext"
import { useEffectScrollTop } from "#utils/utils"
import React from "react"

const Login = () => {
  const { translate } = useLocaleContext()
  const text = translate.pages.login

  useEffectScrollTop()

  return (
    <div className=''>
      <div className=''>
        <div className=''>
          {text.title}
          <form>
            <input type='emai' placeholder={text.emailPlaceholder}></input>
            <input
              type='password'
              placeholder={text.passwordPlaceholder}
            ></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
