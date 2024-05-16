import { commonProperties } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { UserHeaderData } from "."

jest.mock("#hooks/useTranslation")

const data = {
  firstName: "User",
  lastName: "Test",
  email: "usertest@mail.com",
}
describe("UserHeaderData should", () => {
  beforeAll(() => {
    useTranslation.mockReturnValue({ commonProperties })
  })
  test("render user data", () => {
    render(<UserHeaderData data={data} />)
    expect(screen.getByText("User")).toBeInTheDocument()
  })
})
