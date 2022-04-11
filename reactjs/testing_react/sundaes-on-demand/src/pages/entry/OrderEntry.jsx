import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export const OrderEntry = () => {
  const [{ totals }] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
    </div>
  );
};
