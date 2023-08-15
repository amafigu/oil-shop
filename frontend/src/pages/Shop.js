import axios from "axios"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import Sidebar from "../components/Sidebar"
import style from "./shop.module.scss"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("all")
  const [productCategories, setProductCategories] = useState([])

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
    axios
      .get("http://localhost:3001/api/product-categories")
      .then((response) => {
        setProductCategories(response.data)
        console.log("shop.js productCategories", productCategories)
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
    products.filter(
      (product) => product.category === category || category === 1,
    )

  const sortedProducts = filteredProducts(category)

  console.log("sorted ", sortedProducts)

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
