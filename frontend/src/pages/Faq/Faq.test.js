import { translate } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import { Faq } from "#pages/Faq"
import { scrollToTop } from "#utils/scrollToTop"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

jest.mock("#hooks/useTranslation")
jest.mock("#utils/scrollToTop")
describe("Faq page should", () => {
  beforeAll(() => {
    scrollToTop.mockReturnValue(jest.fn())
    useTranslation.mockReturnValue({ translate })
  })

  test("render first question", () => {
    render(<Faq />)
    expect(
      screen.getByText("Which difuser is suitable for which room size?"),
    ).toBeInTheDocument()
  })
})
