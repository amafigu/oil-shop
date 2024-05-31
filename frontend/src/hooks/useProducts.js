import useProductContext from "#context/productContext"

export const useProducts = () => {
  const { products, setProducts, addProduct, updateProduct, deleteProduct } =
    useProductContext()

  return { products, setProducts, addProduct, updateProduct, deleteProduct }
}
