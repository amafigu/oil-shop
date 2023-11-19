import ProductCard from "#components/ProductCard/index"
import { useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import style from "./shop.module.scss"
const Shop = ({ productCategories }) => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/products`,
        )
        console.log("RESPONSE ", productsResponse)
        setProducts(productsResponse.data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    getProducts()
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
      (product) => product.category.name === category || category === "all",
    )

  const sortedProducts = filteredProducts(category)

  useEffectScrollTop()

  return (
    <>
      <div className={style.shopPageWrapper}>
        <div className={style.shopPage}>
          <div className={style.sidebarWrapper}>
            <Sidebar
              setCategory={setCategory}
              productCategories={productCategories}
            />
          </div>

          <div className={style.sortedProducts}>
            {sortedProducts.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
