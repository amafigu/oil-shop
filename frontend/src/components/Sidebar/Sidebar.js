import React from "react"
import style from "./Sidebar.module.css"
import { SidebarItemList } from "../../app/components/SidebarItemList"
import axios from "axios"

const Sidebar = () => {
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
        <li className={style.sidebarItem}>Diffuser für ätherische Öle</li>
        <li className={style.sidebarItem}>Körperpflege</li>
        <li className={style.sidebarItem}>Haarpflege</li>
        <li className={style.sidebarItem}>Sauna Aufgüsse</li>
        <li className={style.sidebarItem}>Naturkosmetik</li>
        <li className={style.sidebarItem}>Balsame</li>
        <li className={style.sidebarItem}>Parfum Roll-Ons</li>
        <li className={style.sidebarItem}>Badeöle</li>
        <li className={style.sidebarItem}>Sauna Aufgüsse</li>
        <li className={style.sidebarItem}>Massageöle</li>
      </ul>
    </div>
  )
}

export default Sidebar
