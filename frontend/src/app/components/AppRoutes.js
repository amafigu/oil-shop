import { Route, Routes } from "react-router-dom"
import { CartProvider } from "../../context/cartContext"

import styles from "../../styles/app/components/_appRoutes.module.scss"

import Navbar from "./Navbar"
import Footer from "../../components/Layout/Footer/Footer"
import About from "../../pages/About/About"
import Cart from "../../pages/Cart/Cart"
import Home from "../../pages/Home/Home"
import Shop from "../../pages/Shop/Shop"
import ProductDetails from "../../pages/ProductDetails/ProductDetails"
import Shipping from "../../components/Checkout/Shipping/Shipping"

const AppRoutes = () => {
  return (
    <div className={styles.wrapper}>
      <CartProvider>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/products/:productName' element={<ProductDetails />} />
            <Route path='/checkout/shipping' element={<Shipping />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </div>
  )
}

export default AppRoutes
