import {
  render,
  screen,
  waitFor,
} from "../../../testUtils/testing-library-utils";
import { OrderEntry } from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

describe("OrderEntry test", () => {
  it("should handle error for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops"),
      (_, res, ctx) => res(ctx.status(500)),
      rest.get("http://localhost:3030/toppings"),
      (_, res, ctx) => res(ctx.status(500))
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  it("should disable order button for no scoops", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const orderButton = screen.getByRole("button", { name: /order sundae/i });

    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });

    userEvent.click(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();
  });
});
