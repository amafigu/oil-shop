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

// END OF FUNCTIONS FOR REFACTORING IN THE TODO ABOVE

export const cancelWithScape = (e, setState) => {
  console.log("cancelWithScape!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", e.key)
  if (e.key === "Escape") {
    console.log("cancelWithScape!!!!!!!!!!!WSASAWSADW", e.key)
    setState(false)
  }
}

export const useEffectScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}
