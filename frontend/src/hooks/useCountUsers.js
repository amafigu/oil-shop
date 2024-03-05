import useUserContext from "#context/userContext"

export const useCountUsers = () => {
  const { counter, setCounter } = useUserContext()

  return { counter, setCounter }
}
