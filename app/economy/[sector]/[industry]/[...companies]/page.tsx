export default function Page({
  params,
  searchParams,
}: {
  params: { sector: string; industry: string; companies: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Try navigating to:
  // http://localhost:3000/economy/manufacturing/automotive/toyota/ford/?price=1&cap=1
  return (
    <div>
      <div>Params: {JSON.stringify(params)}</div>
      <div>Search params: {JSON.stringify(searchParams)}</div>
    </div>
  );
}
