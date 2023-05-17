import React from "react"
import "./Footer.css"
import useLocaleContext from "../../context/locale.context"

const Footer = () => {
  const { translate } = useLocaleContext()

  return (
    <footer className='footer'>
      <p>
        &copy; {new Date().getFullYear()} {translate.footer.copy}
      </p>
    </footer>
  )
}

export default Footer
