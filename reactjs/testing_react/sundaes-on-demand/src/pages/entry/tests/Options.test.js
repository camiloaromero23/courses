import { render, screen } from "../../../testUtils/testing-library-utils";

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
});
