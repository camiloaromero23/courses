"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  addOne,
  initCounterState,
  substractOne,
} from "@/store/counter/counterSlice";
import { useEffect } from "react";
// import { useState } from "react";

interface Props {
  value?: number;
}

interface CounterResponse {
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const response = await fetch("/api/counter");
  const data = await response.json();
  return data;
};

export const CartCounter: React.FC<Props> = ({ value = 0 }) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getApiCounter().then(({ count }) => dispatch(initCounterState(count)));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(initCounterState(value));
  // }, [dispatch, value]);

  // const [count, setCount] = useState(value);

  return (
    <>
      <span className="text-9xl">{count}</span>

      <div className="flex">
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => dispatch(substractOne())}
        >
          -1
        </button>
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => dispatch(addOne())}
        >
          +1
        </button>
      </div>
    </>
  );
};
