import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  expect(button).toHaveTextContent("Change to Midnight Blue");
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(button).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions are correct", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();
});

test("checkbox disables button on first click and enables on second click", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Disabled button changes color to "gray" and reverts to "MediumVioletRed"', () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test('Disabled button changes color to "gray" and reverts to "MidnightBlue"', () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    const res = replaceCamelWithSpaces("Red");
    expect(res).toBe("Red");
  });
  test("works for one inner capital letter", () => {
    const res = replaceCamelWithSpaces("MidnightBlue");
    expect(res).toBe("Midnight Blue");
  });
  test("works for multiple inner capital letters", () => {
    const res = replaceCamelWithSpaces("MediumVioletRed");
    expect(res).toBe("Medium Violet Red");
  });
});
