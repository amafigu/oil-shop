import Footer from "#components/ui/Footer"
import Navbar from "#components/ui/Navbar"
import {
  ROUTES_ABOUT,
  ROUTES_CART,
  ROUTES_CHECKOUT_ORDER_SUMMARY,
  ROUTES_CHECKOUT_PAYMENT,
  ROUTES_CHECKOUT_SHIPPING,
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_FAQ,
  ROUTES_HOME,
  ROUTES_LOGIN,
  ROUTES_PRODUCTS,
  ROUTES_SHOP,
  ROUTES_SIGN_UP,
  ROUTES_SIGN_UP_ADMIN,
  ROUTES_WITHOUT_NAVBAR,
} from "#constants/routes"
import About from "#pages/About"
import Admin from "#pages/Admin"
import { Cart } from "#pages/Cart/Cart"
import Faq from "#pages/Faq"
import { Home } from "#pages/Home"
import { Login } from "#pages/Login"
import NotFound from "#pages/NotFound"
import OrderSummary from "#pages/OrderSummary"
import Payment from "#pages/Payment"
import ProductDetails from "#pages/ProductDetails"
import Shipping from "#pages/Shipping"
import { Shop } from "#pages/Shop"
import { SignUp } from "#pages/SignUp"
import { User } from "#pages/User"
import { getProductCategories } from "#utils/products"
import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import styles from "./appRoutes.module.scss"

const AppRoutes = () => {
  const [productCategories, setProductCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const getCategoriesResponse = await getProductCategories()
        if (getCategoriesResponse.status === 200) {
          setProductCategories(getCategoriesResponse.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getCategories()
  }, [])

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className={styles.wrapper}>
      {!ROUTES_WITHOUT_NAVBAR.includes(currentPath) && (
        <Navbar productCategories={productCategories} />
      )}
      <Routes>
        <Route path={`${ROUTES_ABOUT}`} element={<About />} />
        <Route
          path={`${ROUTES_SHOP}`}
          element={<Shop productCategories={productCategories} />}
        />
        <Route path={`${ROUTES_HOME}`} element={<Home />} />
        <Route path={`${ROUTES_CART}`} element={<Cart />} />
        <Route path={`${ROUTES_FAQ}`} element={<Faq />} />
        <Route path={`${ROUTES_LOGIN}`} element={<Login />} />
        <Route path={`${ROUTES_SIGN_UP}`} element={<SignUp />} />
        <Route path={`${ROUTES_SIGN_UP_ADMIN}`} element={<SignUp />} />
        <Route path={`${ROUTES_CURRENT_CUSTOMER}`} element={<User />} />
        <Route path={`${ROUTES_CURRENT_ADMIN}`} element={<Admin />} />
        <Route
          path={`${ROUTES_PRODUCTS}/:productName`}
          element={<ProductDetails />}
        />
        <Route path={`${ROUTES_CHECKOUT_SHIPPING}`} element={<Shipping />} />
        <Route path={`${ROUTES_CHECKOUT_PAYMENT}`} element={<Payment />} />
        <Route
          path={`${ROUTES_CHECKOUT_ORDER_SUMMARY}`}
          element={<OrderSummary />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default AppRoutes
