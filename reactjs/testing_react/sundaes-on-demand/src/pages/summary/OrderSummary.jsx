import { useOrderDetails } from "../../contexts/OrderDetails";

import { SummaryForm } from "./SummaryForm";

export const OrderSummary = ({ setOrderPhase }) => {
  const [{ totals, scoops, toppings }] = useOrderDetails();

  const scoopArray = [...scoops.entries()];
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  const toppingsArray = [...toppings.keys()];
  const toppingList = toppingsArray.map((key) => {
    return <li key={key}>{key}</li>;
  });

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
