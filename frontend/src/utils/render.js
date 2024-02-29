import { useEffect } from "react"

export const useHideListOnOuterClick = (
  listRef,
  setListOpen,
  setMatchedItems,
) => {
  useEffect(() => {
    const listenClickOutsideSearchProductListDropdown = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setListOpen(false)
        setMatchedItems([])
      }
    }

    document.addEventListener(
      "mousedown",
      listenClickOutsideSearchProductListDropdown,
    )
    return () => {
      document.removeEventListener(
        "mousedown",
        listenClickOutsideSearchProductListDropdown,
      )
    }
  }, [listRef, setListOpen, setMatchedItems])
}

export const getInputChangeAndOpenList =
  (searchArray, setSearchString, setDropdownOpen, setMatches) => (event) => {
    setSearchString(event.target.value)
    setDropdownOpen(true)

    const match = searchArray.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )

    setMatches(match.slice(0, 6))
    if (event.target.value === "") {
      setMatches([])
      setDropdownOpen(false)
    }
  }

export const cancelWithScape = (e, setState) => {
  if (e.key === "Escape") {
    setState(false)
  }
}

export const scrollToTop = () => {
  window.scrollTo(0, 0)
}
