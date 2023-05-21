import { Navigate, Route, Routes } from "react-router-dom"

import { MenuItemList } from "./MenuItemList"
import Navbar from "./Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Footer from "../../components/Footer/Footer"
import About from "../../pages/About/About"
import Shop from "../../pages/Shop/Shop"
import Home from "../../pages/Home/Home"

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default AppRoutes
