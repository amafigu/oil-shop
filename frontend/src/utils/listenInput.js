export const listenInput = (e, updatedDataObj, setUpdatedDataObj) => {
  setUpdatedDataObj({
    ...updatedDataObj,
    [e.target.name]: e.target.value,
  })
}
