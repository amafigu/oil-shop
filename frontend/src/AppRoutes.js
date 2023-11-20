import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import styles from "./appRoutes.module.scss"

import Footer from "#components/Footer"
import Navbar from "#components/Navbar"
import About from "#pages/About"
import Cart from "#pages/Cart"
import Faq from "#pages/Faq"
import Home from "#pages/Home"
import Login from "#pages/Login"
import OrderSummary from "#pages/OrderSummary"
import Payment from "#pages/Payment"
import ProductDetails from "#pages/ProductDetails"
import Shipping from "#pages/Shipping"
import Shop from "#pages/Shop"
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import User from "./pages/User"

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
  const location = useLocation()
  const currentPath = location.pathname

  const routesWithoutNavbar = ["/login", "/sign-up"]

  return (
    <div className={styles.wrapper}>
      {!routesWithoutNavbar.includes(currentPath) && (
        <Navbar productCategories={productCategories} />
      )}

      <Routes>
        <Route path='/about' element={<About />} />
        <Route
          path='/shop'
          element={<Shop productCategories={productCategories} />}
        />

        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/users/current-user' element={<User />} />
        <Route path='/users/current-admin' element={<Admin />} />
        <Route path='/products/:productName' element={<ProductDetails />} />
        <Route path='/checkout/shipping' element={<Shipping />} />
        <Route path='/checkout/payment' element={<Payment />} />
        <Route path='/checkout/summary' element={<OrderSummary />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default AppRoutes
