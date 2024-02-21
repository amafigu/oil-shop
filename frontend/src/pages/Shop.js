import ProductCard from "#components/products/ProductCard"
import Sidebar from "#components/ui/Sidebar"
import { useProductCategory } from "#hooks/useProductCategory"
import { useGetProducts } from "#utils/products"
import { scrollToTop } from "#utils/render"
import React, { useState } from "react"
import style from "./shop.module.scss"

const Shop = ({ productCategories }) => {
  const [products, setProducts] = useState([])
  const { category, setCategory } = useProductCategory()
  scrollToTop()
  useGetProducts(setProducts)

  const filteredProducts = (category) =>
    products.filter(
      (product) => product.category.name === category || category === "all",
    )

  const sortedProducts = filteredProducts(category)

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
