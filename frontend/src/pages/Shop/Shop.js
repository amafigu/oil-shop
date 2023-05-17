import React, { useState, useEffect } from "react"
import axios from "axios"
import Product from "../../components/Product/Product"
import useLocaleContext from "../../context/locale.context"

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
    <div>
      <h1>{translate.pages.shop.title}</h1>
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
  )
}

export default Shop
