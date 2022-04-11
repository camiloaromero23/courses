import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export const OrderEntry = ({ setOrderPhase }) => {
  const [{ totals }] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order sundae!</Button>
    </div>
  );
};
