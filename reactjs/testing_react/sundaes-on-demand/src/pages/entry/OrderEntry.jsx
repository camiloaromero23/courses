import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export const OrderEntry = ({ setOrderPhase }) => {
  const [{ totals }] = useOrderDetails();

  const orderDisabled = totals.scoops === "$0.00";
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
        Order sundae!
      </Button>
    </div>
  );
};
