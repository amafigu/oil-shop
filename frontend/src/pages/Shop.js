import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import Sidebar from "../components/Sidebar"
import style from "./shop.module.scss"

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
    products.filter(product => (product.category === category || category === "all"))

  const sortedProducts = filteredProducts(category)

  return (
    <div className={style.content}>
      <Sidebar setCategory={setCategory} />
      <div className={style.mainContent}>
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.image}
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
