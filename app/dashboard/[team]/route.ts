import { NextResponse } from "next/server";

type Params = {
  team: string;
};

// There cannot be a route.js file at the same route segment level as page.js.
export const dynamic = "force-dynamic"; // defaults to auto
// Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
export const dynamicParams = true; // Dynamic segments not included in generateStaticParams are generated on demand.
export const revalidate = false; // false | 0 | number. Set the default revalidation time for a layout or page.
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5; // limit on the execution of server-side logic

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

// https://nextjs.org/docs/app/api-reference/file-conventions/route
export async function GET(request: Request, context: { params: Params }) {
  console.log(JSON.stringify(context.params));
  const team = context.params.team;

  // const res = await fetch("https://data.mongodb-api.com/", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();

  // For example, navigate to: http://localhost:3000/dashboard/discovery
  return Response.json({ team });
}

// Route Handlers can extend the Web Response API by returning a NextResponse object.
// This allows you to easily set cookies, headers, redirect, and rewrite.

/*

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}

*/
