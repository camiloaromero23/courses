import "./App.css";
import { useMemo, useState } from "react";

export const replaceCamelWithSpaces = (colorName) =>
  colorName.replace(/([A-Z])/g, " $1").trim();

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);

  const newButtonColor = useMemo(
    () =>
      buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed",
    [buttonColor]
  );

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={() => {
          setButtonColor(newButtonColor);
        }}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        aria-checked={disabled}
        id="disable-button-checkbox"
        defaultChecked={disabled}
        value={disabled}
        type="checkbox"
        onClick={() => {
          setDisabled((prev) => !prev);
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
