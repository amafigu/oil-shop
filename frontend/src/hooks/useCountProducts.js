import useProductContext from "#context/productContext"

export const useCountProducts = () => {
  const { counter, setCounter } = useProductContext()

  return { counter, setCounter }
}
