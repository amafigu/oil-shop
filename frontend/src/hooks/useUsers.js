import useUserContext from "#context/userContext"

export const useUsers = () => {
  const { users, setUsers, updateUser, deleteUser, addUser } = useUserContext()

  return { users, setUsers, updateUser, deleteUser, addUser }
}
