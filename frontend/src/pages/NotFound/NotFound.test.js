import { translate } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import { NotFound } from "#pages/NotFound"
import { scrollToTop } from "#utils/render"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

jest.mock("#hooks/useTranslation")
jest.mock("#utils/render")

describe("Faq page should", () => {
  beforeAll(() => {
    scrollToTop.mockReturnValue(jest.fn())
    useTranslation.mockReturnValue({ translate })
  })

  test("render page not found text correctly", () => {
    render(<NotFound />)
    expect(
      screen.getByText("Unfortunately this page does not exist."),
    ).toBeInTheDocument()
  })
})
