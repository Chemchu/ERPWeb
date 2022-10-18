import * as React from "react";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 }
};

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 60 },
  pressed: { scale: 0.95, strokeWidth: 35 },
  checked: { stroke: "#FF008C" },
  unchecked: { stroke: "#ddd", strokeWidth: 50 }
};

export const CheckBox = (props: {isChecked: boolean, setChecked: Function}) => {
  const pathLength = useMotionValue(0);

  return (
    <label className="flex self-center cursor-pointer">
        <input type="checkbox" className="bg-white bg-check h-6 w-6 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none"
            checked={props.isChecked} onChange={() => props.setChecked(!props.isChecked)} />
    </label>
  );
};
