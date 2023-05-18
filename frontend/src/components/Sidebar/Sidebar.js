import React from "react"
import style from "./Sidebar.module.css"
import { SidebarItemList } from "../../app/components/SidebarItemList"

const Sidebar = () => {
  
  return (
    <div>
    <ul className={style.sidebar}>
      {SidebarItemList.map((i) => {
        return (
          <li className={style.sidebarItem}>{i.label}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
