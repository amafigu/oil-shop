import { ROUTES_PRODUCTS } from "#constants/routes"
import axios from "axios"
import { useEffect, useState } from "react"

export const useGetProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}${ROUTES_PRODUCTS}`,
        )
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching product: ", error)
      }
    }
    getProductsList()
  }, [setProducts])

  return { products, setProducts }
}
