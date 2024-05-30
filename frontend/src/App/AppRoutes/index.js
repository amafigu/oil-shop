import { Footer } from "#components/ui/Footer"
import { Navbar } from "#components/ui/Navbar"
import { NavigationMenu } from "#components/ui/NavigationMenu"
import { pageNavigationItems } from "#constants/navigation"
import { STYLES } from "#constants/styles"
import { Route, Routes } from "react-router-dom"
import { routes } from "./routes"

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <NavigationMenu
        items={pageNavigationItems}
        className={STYLES.COMPONENTS.NAVIGATION_MENU.PAGES}
      />
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
