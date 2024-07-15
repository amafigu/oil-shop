import { render, screen } from "@testing-library/react"
import { NotificationCard } from "./index"

describe("NotificationCard", () => {
  test("renders the message when provided", () => {
    const message = "message"
    render(<NotificationCard message={message} />)

    const messageElement = screen.getByText(message)

    expect(messageElement).toBeInTheDocument()
  })
})
