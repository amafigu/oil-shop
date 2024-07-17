import {
  ABOUT,
  ACCOUNT_ORDERS,
  ACCOUNT_PROFILE,
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
  PRODUCTS_CREATE,
  PRODUCTS_MANAGEMENT,
  SHOP,
  SIGN_UP,
  SIGN_UP_ADMIN,
  USERS_CREATE,
  USERS_MANAGEMENT,
} from "@/constants/routes"
import { About } from "@/pages/About"
import { Admin } from "@/pages/Admin"
import { Cart } from "@/pages/Cart"
import { CreateProduct } from "@/pages/CreateProduct"
import { CreateUser } from "@/pages/CreateUser"
import { Faq } from "@/pages/Faq"
import { Home } from "@/pages/Home"
import { Login } from "@/pages/Login"
import { NotFound } from "@/pages/NotFound"
import { Orders } from "@/pages/Orders"
import { OrderSummary } from "@/pages/OrderSummary"
import { Payment } from "@/pages/Payment"
import { ProductDetails } from "@/pages/ProductDetails"
import { ProductsManagement } from "@/pages/ProductsManagement"
import { Profile } from "@/pages/Profile"
import { Shop } from "@/pages/Shop"
import { SignUp } from "@/pages/SignUp"
import { User } from "@/pages/User"
import { UsersManagement } from "@/pages/UsersManagement"

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
  { path: `${PRODUCTS}/:id`, element: <ProductDetails /> },
  { path: SIGN_UP, element: <SignUp /> },
  { path: SIGN_UP_ADMIN, element: <SignUp /> },
  { path: SHOP, element: <Shop /> },
  { path: CURRENT_CUSTOMER, element: <User /> },
  { path: ACCOUNT_ORDERS, element: <Orders /> },
  { path: ACCOUNT_PROFILE, element: <Profile /> },
  { path: USERS_MANAGEMENT, element: <UsersManagement /> },
  { path: PRODUCTS_MANAGEMENT, element: <ProductsManagement /> },
  { path: PRODUCTS_CREATE, element: <CreateProduct /> },
  { path: USERS_CREATE, element: <CreateUser /> },
]
