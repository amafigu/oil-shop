import { Route, Routes } from "react-router-dom"
import { Footer } from "../../components/ui/Footer"
import { Navbar } from "../../components/ui/Navbar"
import { NavigationMenu } from "../../components/ui/NavigationMenu"
import { routes } from "./routes"

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <NavigationMenu />
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </>
  )
}

export default AppRoutes
