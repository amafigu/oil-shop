import React, { useState, useEffect } from "react"
import axios from "axios"
import Product from "../../components/Product/Product"
import useLocaleContext from "../../context/locale.context"
import Sidebar from "../../components/Sidebar/Sidebar"
import style from "./Shop.module.css"
const Shop = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        console.log("res ", response)
        setProducts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [])

  const { translate } = useLocaleContext()

  return (
    <div className={style.content}>
      <Sidebar />
      <div className={style.mainContent}>
        {products.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            image={process.env.PUBLIC_URL + "/" + product.image}
            size={product.size}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop
