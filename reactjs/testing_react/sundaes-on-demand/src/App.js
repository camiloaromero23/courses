import { Container } from "react-bootstrap";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderSummary } from "./pages/summary/OrderSummary";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
