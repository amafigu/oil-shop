import React from "react"
import style from "./Sidebar.module.css"
import axios from "axios"
import useLocaleContext from "../../context/locale.context"

const Sidebar = () => {
  const {translate} = useLocaleContext();

  function callYL() {
    const username = "your_username"
    const password = "your_password"

    axios
      .post("https://www.youngliving.com/api/accounts/token", {
        userName: username,
        email: username,
        memberId: username,
        password: password,
        rememberMe: true,
      })
      .then((response) => {
        console.log("response.data ", response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <ul className={style.sidebar}>
      <li className={style.sidebarItem}>{translate.sidebar.essentialOils}</li>
        <li className={style.sidebarItem}>{translate.sidebar.difusers}</li>
        <li className={style.sidebarItem}>{translate.sidebar.bodyCare}</li>
        <li className={style.sidebarItem}>{translate.sidebar.hairCare}</li>
        <li className={style.sidebarItem}>{translate.sidebar.rollOn}</li>
        <li className={style.sidebarItem}>{translate.sidebar.massageOils}</li>
      </ul>
    </div>
  )
}

export default Sidebar
