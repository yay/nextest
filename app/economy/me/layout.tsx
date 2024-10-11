// Shared UI for a segment and its children
export default function SomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div>&quot;Me&quot; segment header</div>
      <div>{children}</div>
    </div>
  );
}
