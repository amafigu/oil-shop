/* eslint-disable @typescript-eslint/no-explicit-any */
export const setDefaultImageByError = (event: any, image: string) => {
  event.target.src = image
}
