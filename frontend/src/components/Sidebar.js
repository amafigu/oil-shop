import axios from "axios"
import { React, useEffect, useState } from "react"
import styles from "./sidebar.module.scss"

const Sidebar = ({ setCategory }) => {
  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/product-categories")
      .then((response) => {
        setProductCategories(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [])

  const renderedCategories = productCategories
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => (
      <li
        key={category.id}
        onClick={() => setCategory(category.name)}
        className={styles.sidebarItem}
      >
        {category.name}
      </li>
    ))

  return (
    <div>
      <ul className={styles.sidebar}>{renderedCategories}</ul>
    </div>
  )
}

export default Sidebar
