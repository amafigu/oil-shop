import { navigationMenuItems } from "@/constants/navigation"
import { useMenuContext } from "@/context/menuContext"
import { useEffect } from "react"

export const useActivePageLink = () => {
  const { activePageLink, setActivePageLink } = useMenuContext()
  const location = window.location.pathname
  const path = window.location.pathname.slice(1)

  useEffect(() => {
    const pageLinks = navigationMenuItems.map((item) => {
      return item.label
    })
    if (pageLinks.includes(path)) {
      setActivePageLink(path)
    } else if (path === "") {
      setActivePageLink("home")
    } else {
      setActivePageLink("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return { activePageLink, setActivePageLink }
}
