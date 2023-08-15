import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { CartProvider } from "./context/cartContext"

import styles from "./appRoutes.module.scss"

import Footer from "#components/Footer"
import Navbar from "#components/Navbar"
import SidebarMenu from "#components/SidebarMenu"
import About from "#pages/About"
import Cancellation from "#pages/Cancellation"
import Cart from "#pages/Cart"
import Faq from "#pages/Faq"
import Home from "#pages/Home"
import OrderSummary from "#pages/OrderSummary"
import Payment from "#pages/Payment"
import ProductDetails from "#pages/ProductDetails"
import Shipping from "#pages/Shipping"
import Shop from "#pages/Shop"

const AppRoutes = () => {
  const [isSidebarMenuVisible, setSidebarMenuVisible] = useState(false)

  const toggleSidebarMenuVisibility = () => {
    setSidebarMenuVisible((prevIsSidebarVisible) => !prevIsSidebarVisible)
  }

  return (
    <div className={styles.wrapper}>
      <CartProvider>
        <Navbar toggleSidebarMenuVisibility={toggleSidebarMenuVisibility} />
        <div className={styles.content}>
          <SidebarMenu
            setSidebarMenuVisible={setSidebarMenuVisible}
            isOpen={isSidebarMenuVisible}
          />

          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/products/:productName' element={<ProductDetails />} />
            <Route path='/checkout/shipping' element={<Shipping />} />
            <Route path='/checkout/payment' element={<Payment />} />
            <Route path='/checkout/summary' element={<OrderSummary />} />
            <Route path='/cancellation' element={<Cancellation />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </div>
  )
}

export default AppRoutes
