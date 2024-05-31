import { translate } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import { NotFound } from "#pages/NotFound"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

jest.mock("#hooks/useTranslation")
jest.mock("#utils/scrollToTop")

describe("Faq page should", () => {
  beforeAll(() => {
    useTranslation.mockReturnValue({ translate })
  })

  test("render page not found text correctly", () => {
    render(<NotFound />)
    expect(
      screen.getByText("Unfortunately this page does not exist."),
    ).toBeInTheDocument()
  })
})
