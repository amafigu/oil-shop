import axios from "axios"
import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { titleCase } from "../utils/utils"
import styles from "./sidebar.module.scss"

const Sidebar = ({ setCategory, setMenuOpen }) => {
  const [productCategories, setProductCategories] = useState([])

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

  const navigate = useNavigate()

  const setMayBeMenuOpen = (bool) => {
    if (setMenuOpen) {
      setMenuOpen(bool)
    }
    return bool
  }

  const renderedCategories = productCategories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => (
      <li
        key={category.name}
        onClick={() => {
          setCategory(category.name)
          setMayBeMenuOpen(false)
          navigate(`/shop?category=${category.name}`)
          window.scrollTo(0, 0)
        }}
        className={styles.sidebarItem}
      >
        {titleCase(category.name, "_")}
      </li>
    ))

  return renderedCategories
}

export default Sidebar
