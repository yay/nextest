"use client";

// layout.tsx wins over template.tsx, if both exist in the same directory
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const LayoutContext = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);

// Rendering converts the code you write into user interfaces.
// React and Next.js allow you to create hybrid web applications
// where parts of your code can be rendered on the server or the client.
export default function Layout({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState(55); // using state requires "use client";
  return (
    <div>
      <div>Layout Component</div>
      <div>Value: {value}</div>
      <LayoutContext.Provider value={setValue}>
        <div>{children}</div>
      </LayoutContext.Provider>
    </div>
  );
}
