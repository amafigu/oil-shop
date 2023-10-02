import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import styles from "./appRoutes.module.scss"
import { CartProvider } from "./context/cartContext"

import Footer from "#components/Footer"
import Navbar from "#components/Navbar"
import About from "#pages/About"
import Cart from "#pages/Cart"
import Faq from "#pages/Faq"
import Home from "#pages/Home"
import OrderSummary from "#pages/OrderSummary"
import Payment from "#pages/Payment"
import ProductDetails from "#pages/ProductDetails"
import Shipping from "#pages/Shipping"
import Shop from "#pages/Shop"

const AppRoutes = () => {
  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product-categories`)
      .then((response) => {
        setProductCategories(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [])

  const useActiveElement = () => {
    const [active, setActive] = useState(document.activeElement)

    const handleFocusIn = (e) => {
      setActive(document.activeElement)
    }

    useEffect(() => {
      document.addEventListener("focusin", handleFocusIn)
      return () => {
        document.removeEventListener("focusin", handleFocusIn)
      }
    }, [])

    return active
  }

  const focusedElement = useActiveElement()

  useEffect(() => {
    if (focusedElement) {
      focusedElement.value && console.log(focusedElement.value)
    }
    console.log(focusedElement)
  }, [focusedElement])
  return (
    <div className={styles.wrapper}>
      <CartProvider>
        <Navbar productCategories={productCategories} />

        <Routes>
          <Route path='/about' element={<About />} />
          <Route
            path='/shop'
            element={<Shop productCategories={productCategories} />}
          />

          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/products/:productName' element={<ProductDetails />} />
          <Route path='/checkout/shipping' element={<Shipping />} />
          <Route path='/checkout/payment' element={<Payment />} />
          <Route path='/checkout/summary' element={<OrderSummary />} />
        </Routes>

        <Footer />
      </CartProvider>
    </div>
  )
}

export default AppRoutes
