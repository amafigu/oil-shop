export const cancelWithScape = (e, setState) => {
  if (e.key === "Escape") {
    setState(false)
  }
}

export const scrollToTop = () => {
  window.scrollTo(0, 0)
}
