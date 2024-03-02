import useProductContext from "#context/productContext"

export const useGetProducts = () => {
  const { products, setProducts } = useProductContext()

  return { products, setProducts }
}
