import { Product } from "@/types/Product"
import { Dispatch, SetStateAction } from "react"

export const searchProducts = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any,
  items: Product[],
  setSearchItemText: Dispatch<SetStateAction<string>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMatches: Dispatch<SetStateAction<any>>,
  setShowMatchedItemsList: Dispatch<SetStateAction<boolean>>,
) => {
  setSearchItemText(e.target.value)
  const match = items.filter((item: Product) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase()),
  )
  if (e.target.value === "") {
    setMatches([])
  } else {
    setMatches(match.slice(0, 6))
    setShowMatchedItemsList(true)
  }
}
