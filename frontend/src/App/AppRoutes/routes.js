import {
  ABOUT,
  CART,
  CURRENT_ADMIN,
  CURRENT_CUSTOMER,
  FAQ,
  HOME,
  LOGIN,
  NOT_FOUND,
  ORDER_SUMMARY,
  PAYMENT,
  PRODUCTS,
  SHIPPING,
  SHOP,
  SIGN_UP,
  SIGN_UP_ADMIN,
} from "#constants/routes"
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

export const routes = [
  { path: ABOUT, element: <About /> },
  { path: CURRENT_ADMIN, element: <Admin /> },
  { path: CART, element: <Cart /> },
  { path: FAQ, element: <Faq /> },
  { path: HOME, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: NOT_FOUND, element: <NotFound /> },
  { path: ORDER_SUMMARY, element: <OrderSummary /> },
  { path: PAYMENT, element: <Payment /> },
  { path: PRODUCTS, element: <ProductDetails /> },
  { path: SIGN_UP, element: <SignUp /> },
  { path: SIGN_UP_ADMIN, element: <SignUp /> },
  { path: SHIPPING, element: <Shipping /> },
  { path: SHOP, element: <Shop /> },
  { path: CURRENT_CUSTOMER, element: <User /> },
]
