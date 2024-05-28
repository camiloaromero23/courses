"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar: React.FC<Props> = ({
  tabOptions = [1, 2, 3, 4],
  currentTab = 1,
}) => {
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-${tabOptions.length}`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selectedTab === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
