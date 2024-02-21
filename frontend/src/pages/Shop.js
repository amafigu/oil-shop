import Sidebar from "#components/Sidebar"
import ProductCard from "#components/products/ProductCard"
import { useGetProducts } from "#utils/products"
import { useEffectScrollTop } from "#utils/render"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import style from "./shop.module.scss"

const Shop = ({ productCategories }) => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const queryCategory = params.get("category")

  useGetProducts(setProducts)

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
