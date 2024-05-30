import { translate } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import { About } from "#pages/About"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
jest.mock("#hooks/useTranslation")
jest.mock("#utils/scrollToTop")

describe("About page should", () => {
  beforeAll(() => {
    useTranslation.mockReturnValue({ translate })
  })

  test("renders correctly", () => {
    render(<About />)
    expect(screen.getByText("To Source Code")).toBeInTheDocument()
  })
})
