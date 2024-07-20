import { Product } from "@/types/Product"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

export const searchProducts = (
  e: ChangeEvent<HTMLInputElement>,
  items: Product[],
  setSearchItemText: Dispatch<SetStateAction<string>>,
  setMatches: Dispatch<SetStateAction<Product[]>>,
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
