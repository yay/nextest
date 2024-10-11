"use client";

import { useContext } from "react";
import { TemplateContext } from "../_template";
import { LayoutContext } from "../layout";

export default function Sub1() {
  // const setValue = useContext(TemplateContext);
  const setValue = useContext(LayoutContext);
  return (
    <div>
      <div>Template child: Sub1</div>
      <button onClick={() => setValue?.(Math.random())}>
        Set random value
      </button>
    </div>
  );
}
