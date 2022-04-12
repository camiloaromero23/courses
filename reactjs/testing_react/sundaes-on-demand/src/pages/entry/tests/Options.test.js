import { render, screen } from "../../../testUtils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import { Options } from "../Options";

describe("Options", () => {
  it("should diplay image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((image) => image.getAttribute("alt"));
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  it("should display image for each topping option from server", async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });

    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((image) => image.getAttribute("alt"));
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms' topping",
      "Hot fudge topping",
    ]);
  });

  it("should not update total if scoops input is invalid", async () => {
    render(<Options optionType="scoops" />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");

    const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
    expect(scoopsSubtotal).toBeInTheDocument();
  });
});
