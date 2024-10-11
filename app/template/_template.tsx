"use client";

// "use client" is used to declare a boundary between a Server and Client Component modules.
// This means that by defining a "use client" in a file, all other modules imported into it,
// including child components, are considered part of the client bundle.

// Defining multiple use client entry points:

// You can define multiple "use client" entry points in your React Component tree.
// This allows you to split your application into multiple client bundles.

import { createContext, Dispatch, SetStateAction, useState } from "react";

export const TemplateContext = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);

// A template file is similar to a layout in that it wraps each child layout or page.
// Unlike layouts that persist across routes and maintain state,
// templates create a new instance for each of their children on navigation.

// Template components should accept and use a children prop. template is rendered between a layout and its children. For example:
// Note that the template is given a unique key.
// <Layout>
//   <Template key={routeParam}>{children}</Template>
// </Layout>

// By default, template is a Server Component, but can also be used as a Client Component through the "use client" directive.
// If you just think about the architecture, "use client" cannot be the default.
// Server components can render client components, but you can't have it the other way around.

// https://nextjs.org/docs/app/api-reference/file-conventions/template

// When a user navigates between routes that share a template, a new instance of the component is mounted,
// DOM elements are recreated, state is not preserved, and effects are re-synchronized.

// Rendering converts the code you write into user interfaces.
// React and Next.js allow you to create hybrid web applications
// where parts of your code can be rendered on the server or the client.
export default function Template({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState(55); // using state requires "use client";
  return (
    <div>
      <div>Template shit</div>
      <div>Value: {value}</div>
      <TemplateContext.Provider value={setValue}>
        <div>{children}</div>
      </TemplateContext.Provider>
    </div>
  );
}

// React Team: we are introducing a new kind of component — Server Components —
// that run ahead of time and are excluded from your JavaScript bundle.
// Server Components can run during the build, letting you read from the filesystem or fetch static content.
// They can also run on the server, letting you access your data layer without having to build an API.
// You can pass data by props from Server Components to the interactive Client Components in the browser.

// RSC combines the simple “request/response” mental model of server-centric Multi-Page Apps
// with the seamless interactivity of client-centric Single-Page Apps, giving you the best of both worlds.

// We introduced async / await as the primary way to do data fetching from Server Components.
// We also plan to support data loading from the client by introducing a new Hook called use that unwraps Promises.

// Building your own RSC-compatible framework is not as easy as we’d like it to be,
// mainly due to the deep bundler integration needed. The current generation of bundlers are great for use on the client,
// but they weren’t designed with first-class support for splitting a single module graph between the server and the client.
// This is why we’re now partnering directly with bundler developers to get the primitives for RSC built-in.

// We’re working to fully integrate Suspense with the loading lifecycle of stylesheets, fonts, and images,
// so that React takes them into account to determine whether the content is ready to be displayed.

// Offscreen rendering.
// - A router can prerender screens in the background so that when a user navigates to them, they’re instantly available.
// - A tab switching component can preserve the state of hidden tabs, so the user can switch between them without losing their progress.
// - A virtualized list component can prerender additional rows above and below the visible window.
// We’ve also improved how offscreen rendering works with Suspense — suspending inside an offscreen tree will not trigger Suspense fallbacks.

// More: https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components

// useTransition is a React Hook that lets you update the state without blocking the UI.

// React Server Components allow you to write UI that can be rendered and optionally cached on the server.
// In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering,
// and there are three different server rendering strategies:
// - Static Rendering
// - Dynamic Rendering
// - Streaming

// On the server, Next.js uses React's APIs to orchestrate rendering.
// The rendering work is split into chunks: by individual route segments and Suspense Boundaries.

// Each chunk is rendered in two steps:

// - React renders Server Components into a special data format called the React Server Component Payload (RSC Payload).
// - Next.js uses the RSC Payload and Client Component JavaScript instructions to render HTML on the server.

// Then, on the client:

// - The HTML is used to immediately show a fast non-interactive preview of the route - this is for the initial page load only.
// - The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
// - The JavaScript instructions are used to hydrate Client Components and make the application interactive.

// What is the React Server Component Payload (RSC)?

// The RSC Payload is a compact binary representation of the rendered React Server Components tree.
// It's used by React on the client to update the browser's DOM. The RSC Payload contains:

// - The rendered result of Server Components
// - Placeholders for where Client Components should be rendered and references to their JavaScript files
// - Any props passed from a Server Component to a Client Component

// In Next.js, Client Components are rendered differently depending on
// - whether the request is part of a full page load (an initial visit to your application
//   or a page reload triggered by a browser refresh)
// - or a subsequent navigation.

// Full page load

// To optimize the initial page load, Next.js will use React's APIs to render a static HTML preview on the server
// for both Client and Server Components. <-- !!!

// This means, when the user first visits your application, they will see the content of the page immediately,
// without having to wait for the client to download, parse, and execute the Client Component JavaScript bundle.

// On the server:

// - React renders Server Components into a special data format called the React Server Component Payload (RSC Payload),
// which includes references to Client Components.
// - Next.js uses the RSC Payload and Client Component JavaScript instructions to render HTML for the route on the server.

// Then, on the client:

// - The HTML is used to immediately show a fast non-interactive initial preview of the route.
// - The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
// - The JavaScript instructions are used to hydrate Client Components and make their UI interactive.

// What is hydration?

// Hydration is the process of attaching event listeners to the DOM, to make the static HTML interactive.
// Behind the scenes, hydration is done with the `hydrateRoot` React API:
// https://react.dev/reference/react-dom/client/hydrateRoot

// `hydrateRoot` lets you display React components inside a browser DOM node
// whose HTML content was previously generated by react-dom/server.

// const root = hydrateRoot(domNode, reactNode, options?)

// Subsequent Navigations

// On subsequent navigations, Client Components are rendered entirely on the client, without the server-rendered HTML.

// This means the Client Component JavaScript bundle is downloaded and parsed.
// Once the bundle is ready, React will use the RSC Payload to reconcile the Client and Server Component trees,
// and update the DOM.

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
