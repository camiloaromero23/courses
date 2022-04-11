import { render, screen } from "../../../testUtils/testing-library-utils";
import { render as renderWithoutContext } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";
import { OrderEntry } from "../OrderEntry";

describe("totalUpdates", () => {
  it("should update scoop subtotal when scoops change", async () => {
    render(<Options optionType="scoops" />);

    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("Scoops total: $0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });

  it("should error if no wrapped by context", () => {
    expect(() => {
      renderWithoutContext(<OrderEntry />);
    }).toThrow("useOrderDetails must be used within an OrderDetailsProvider");
  });

  it("should update toppings subtotal when toppings change", async () => {
    render(<Options optionType="toppings" />);
    const toppingsTotal = screen.getByText("Toppings total: $", {
      exact: false,
    });

    expect(toppingsTotal).toHaveTextContent("0.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);

    expect(toppingsTotal).toHaveTextContent("1.50");

    const mymsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms'",
    });

    userEvent.click(mymsCheckbox);

    expect(toppingsTotal).toHaveTextContent("3.00");

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    userEvent.click(hotFudgeCheckbox);

    expect(toppingsTotal).toHaveTextContent("4.50");

    userEvent.click(hotFudgeCheckbox);

    expect(toppingsTotal).toHaveTextContent("3.00");
  });

  it("should start at $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("Grand total: $0.00");
  });

  it("should update properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("5.50");
  });

  it("should update properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("7.50");
  });

  it("should update properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("7.50");

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("6.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
