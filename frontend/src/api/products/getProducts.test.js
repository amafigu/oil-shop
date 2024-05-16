import products from "#__mocks__/products"
import * as axios from "axios"
import "jest-environment-jsdom"
import { getProducts } from "./getProducts"

jest.mock("axios")
jest.mock("#api/products/getProducts")

describe("getProducts request should", () => {
  test("retrieve all products", async () => {
    axios.get.mockResolvedValue({ data: { products } })
    const response = await getProducts()
    expect(response).toEqual(products.data)
  })
})
