import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScoopOption } from "../ScoopOption";

describe("ScoopOption", () => {
  it("should indicatie if scoop count si non-int or out of range", () => {
    render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

    const vanillaInput = screen.getByRole("spinbutton");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");

    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2.5");

    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "11");

    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");

    expect(vanillaInput).not.toHaveClass("is-invalid");
  });
});
