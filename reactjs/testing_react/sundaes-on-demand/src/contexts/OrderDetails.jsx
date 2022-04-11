import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities/index";

const OrderContext = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;

    for (const count of optionCounts[optionType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
  };

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const updateItemCount = (itemName, newItemCount, optionType) => {
    setOptionCounts((prevState) => {
      const newMap = new Map(prevState[optionType]);
      newMap.set(itemName, +newItemCount);
      return {
        ...prevState,
        [optionType]: newMap,
      };
    });
  };

  const value = useMemo(() => {
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
};
