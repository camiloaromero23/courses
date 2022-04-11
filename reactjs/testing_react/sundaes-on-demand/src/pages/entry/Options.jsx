import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";
import { AlertBanner } from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [{ totals }, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent
      key={name}
      name={name}
      imagePath={imagePath}
      updateItemCount={(itemName, newItemCount) => {
        updateItemCount(itemName, newItemCount, optionType);
      }}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
