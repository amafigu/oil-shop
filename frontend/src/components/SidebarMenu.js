import useLocaleContext from "#context/localeContext"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { titleCase } from "../utils/utils"
import styles from "./sidebarMenu.module.scss"

const SidebarMenu = ({ setSidebarMenuVisible, isOpen }) => {
  const [slideInOutClass, setSlideInOutClass] = useState(
    isOpen ? "visible" : "hidden",
  )
  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
    if (isOpen) {
      setSlideInOutClass("visible")
    } else {
      setSlideInOutClass("hidden")
    }
  }, [isOpen])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product-categories`)
      .then((response) => {
        setProductCategories(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [])

  const { translate } = useLocaleContext()
  const text = translate.components.sidebarMenu

  const renderedCategories = productCategories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => (
      <Link key={category.id} to={`/shop?category=${category.name}`}>
        <div className={styles.sidebarItem}>
          {titleCase(category.name, "_")}
        </div>
      </Link>
    ))

  return (
    <div className={styles[slideInOutClass]}>
      <div className={styles.sidebar}>
        <div
          className={styles.sidebarItem}
          onClick={() => setSidebarMenuVisible(false)}
        >
          <span className='material-symbols-outlined'>close</span>
        </div>
        {renderedCategories}
        <Link to='/login' title={text.accountAndLogin}>
          <div className={styles.sidebarItem}>{text.accountAndLogin}</div>
        </Link>
        <Link to='/shop' title={text.onlineShop}>
          <div className={styles.sidebarItem}>{text.onlineShop}</div>
        </Link>
        <Link to='/cancellation' title={text.cancellationPolicyTitle}>
          <div className={styles.sidebarItem}>{text.cancellationPolicy}</div>
        </Link>
        <Link to='/return' title={text.returnProductsTitle}>
          <div className={styles.sidebarItem}>{text.returnProducts}</div>
        </Link>
        <Link to='/faq' title={text.faqTitle}>
          <div className={styles.sidebarItem}>{text.faq}</div>
        </Link>
        <a href='mailto:oylooils@gmail.com'>
          <div className={styles.sidebarItem}>Contact us</div>
        </a>
      </div>
    </div>
  )
}

export default SidebarMenu
