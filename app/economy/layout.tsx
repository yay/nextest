// Shared UI for a segment and its children.
export default function EconomyLayout({ children }: React.PropsWithChildren) {
  return (
    <div style={{ border: "1px solid red", margin: "10px", padding: "10px" }}>
      <div>{"'Economy' segment header"}</div>
      <div>{children}</div>
    </div>
  );
}
