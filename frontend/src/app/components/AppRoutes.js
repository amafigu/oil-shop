import {
  Navigate,
  Route,
  Routes,
  Router,
  BrowserRouter,
} from "react-router-dom"
import { MenuItemList } from "./MenuItemList"

import Home from "../../pages/Home/Home"
import About from "../../pages/About/About"
import Shop from "../../pages/Shop/Shop"
import Navbar from "./Navbar"
import Footer from "../../components/Footer/Footer"
import Sidebar from "../../components/Sidebar/Sidebar"

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {MenuItemList.map((i) => {
          ;<Route path={i.path} element={i.component} />
        })}
      </Routes>
      <Sidebar />
      <Footer />
    </>
  )
}

export default AppRoutes
