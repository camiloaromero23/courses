import App from "./App";
import { render } from "@testing-library/react";
test("App", () => {
  render(<App />);
  expect(App).toBeTruthy();
});
