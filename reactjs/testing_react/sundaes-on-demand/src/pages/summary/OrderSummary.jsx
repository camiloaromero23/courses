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

  const hasToppings = toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = [...toppings.keys()];
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
