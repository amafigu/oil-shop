import useUserContext from "#context/userContext"

export const useGetUsers = () => {
  const { users, setUsers } = useUserContext()

  return { users, setUsers }
}
