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
        console.log("sidebar.js productCategories", response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [])

  // Render all categories dynamically.
  const renderedCategories = productCategories.map((category) => (
    <li
      key={category.id} // Assuming each category has a unique ID.
      onClick={() => setCategory(category.id)}
      className={styles.sidebarItem}
    >
      {category.id}
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
