import axios from "axios";
import { Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

export const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then(({ data }) => {
        setOrderNumber(data.orderNumber);
      })
      .catch(console.error);
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  if (!orderNumber) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: "25%" }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
};
