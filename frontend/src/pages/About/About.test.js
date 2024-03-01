import { translate } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import { About } from "#pages/About"
import { scrollToTop } from "#utils/render"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
jest.mock("#hooks/useTranslation")
jest.mock("#utils/render")

describe("About page should", () => {
  beforeAll(() => {
    scrollToTop.mockReturnValue(jest.fn())
    useTranslation.mockReturnValue({ translate })
  })

  test("render github link correctly", () => {
    render(<About />)
    expect(
      screen.getByText("https://github.com/amafigu/oil-shop"),
    ).toBeInTheDocument()
  })
})
