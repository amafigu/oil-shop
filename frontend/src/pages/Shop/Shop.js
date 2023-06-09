import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import Product from "../../components/Product/Product"
import useLocaleContext from "../../context/locale.context"
import Sidebar from "../../components/Sidebar/Sidebar"
import style from "../../styles/pages/_shop.module.scss"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("all")

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

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

  useEffect(() => {
    if (queryCategory) {
      setCategory(queryCategory)
    } else {
      setCategory("all")
    }
  }, [queryCategory])

  const filteredProducts = (category) =>
    products.filter((product) => {
      if (product.category === category) {
        return true
      }
      if (category === "all") {
        return true
      }
      return false
    })

  const sortedRegions = filteredProducts(category)

  console.log("sorted ", sortedRegions)

  const { translate } = useLocaleContext()

  return (
    <div className={style.content}>
      <Sidebar
        products={products}
        filteredProducts={filteredProducts}
        setCategory={setCategory}
      />
      <div className={style.mainContent}>
        {sortedRegions.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            image={process.env.PUBLIC_URL + "/" + product.image}
            size={product.size}
            price={product.price}
            description={product.description}
            category={product.category}
          />
        ))}
      </div>
    </div>
  )
}

export default Shop
