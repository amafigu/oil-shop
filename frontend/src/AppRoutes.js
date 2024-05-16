import { Footer } from "#components/ui/Footer"
import { Navbar } from "#components/ui/Navbar"
import { NavigationMenu } from "#components/ui/NavigationMenu"
import { pageNavigationItems } from "#constants/navigation"
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
} from "#constants/routes"
import { STYLES } from "#constants/styles"
import { About } from "#pages/About"
import { Admin } from "#pages/Admin"
import { Cart } from "#pages/Cart"
import { Faq } from "#pages/Faq"
import { Home } from "#pages/Home"
import { Login } from "#pages/Login"
import { NotFound } from "#pages/NotFound"
import { OrderSummary } from "#pages/OrderSummary"
import { Payment } from "#pages/Payment"
import { ProductDetails } from "#pages/ProductDetails"
import { Shipping } from "#pages/Shipping"
import { Shop } from "#pages/Shop"
import { SignUp } from "#pages/SignUp"
import { User } from "#pages/User"
import { Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <NavigationMenu
        items={pageNavigationItems}
        className={STYLES.COMPONENTS.NAVIGATION_MENU.PAGES}
      />
      <Routes>
        <Route path={`${ROUTES_ABOUT}`} element={<About />} />
        <Route path={`${ROUTES_SHOP}`} element={<Shop />} />
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
    </>
  )
}

export default AppRoutes
