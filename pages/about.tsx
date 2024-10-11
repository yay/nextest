// Pages and App routers can coexist, but the routes themselves can’t.

// The App Router takes priority over the Pages Router.
// Routes across directories should not resolve to the same URL path
// and will cause a build-time error to prevent a conflict.

// Pages router supports primarily client-side components.

// https://nextjs.org/docs/pages/building-your-application/routing

export default function About() {
  return <div>About</div>;
}

// +----------------------+------------------------------------------------------------------+---------------------------------------------------------+
// | Aspect               | App Router                                                       | Pages Router                                            |
// +----------------------+------------------------------------------------------------------+---------------------------------------------------------+
// | Structure            | Modular and organized with app/ directory                        | Traditional, file-based routing with pages/ directory   |
// | Routing              | Advanced routing with flexibility, parallel routing, and layouts | Automatic routes based on file structure                |
// | Components           | Supports both Client and Server Components                       | Primarily client-side components                        |
// | Layouts              | Easy and nested layouts using layout.tsx                         | Managed via _app.js                                     |
// | Server Actions       | Allows executing server-side code based on client-side events    | Not available                                           |
// | SEO                  | Built-in SEO with automatic metadata handling                    | SEO managed via next/head                               |
// | Data Fetching        | Uses React Server Components and modern data-fetching techniques | Uses getStaticProps, getServerSideProps, getStaticPaths |
// | Learning Curve       | Steeper, with more advanced concepts                             | Easier for beginners, more intuitive                    |
// | Flexibility          | High flexibility, better for complex applications                | Less flexible, better for simpler projects              |
// | Usage Recommendation | Best for new projects or those needing advanced features         | Suitable for older projects or simpler use cases        |
// | Scalability          | Highly scalable with support for complex architectures           | Sufficient for many applications but less scalable      |
// | SEO Optimization     | Enhanced built-in SEO features                                   | Requires manual configuration with next/head            |
// | Parallel Routing     | Supported, allowing multiple pages to render on the same URL     | Not supported                                           |
// | Intercepting Routes  | Supports route interception for conditional rendering            | Not supported                                           |
// | Custom Document      | Managed through layout.tsx                                       | Managed through _document.tsx                           |
// | Pro Tip              | Can use both routers, but app routes take priority               | Typically, use one router to avoid confusion            |
// +----------------------+------------------------------------------------------------------+---------------------------------------------------------+

// The App Router uses a hierarchical layout system (with layout.js files), which allows you to share layouts across multiple pages.
// However, the Pages Router doesn’t have this feature by default, and layouts need to be manually added to each page
// or globally through the _app.js file.

// 1. Routing Priority Conflicts
//    Avoid duplicating routes in both directories.
//    Be intentional about which routing system is used for specific paths.

// 2. Layouts and Shared Components
//    Keep layouts within their respective routers
//    and be cautious when expecting them to behave the same across both systems.

// Gotcha: If you’re using layouts in the app/ directory, but rendering pages from the pages/ directory,
// the layout structure of the App Router will not apply to those pages.
// The layouts in the app/ directory won’t automatically wrap pages in the pages/ directory.

// 3. Different Data Fetching Methods
// 	Pages Router uses data fetching methods like `getStaticProps()`, `getServerSideProps()`, and `getInitialProps()`.
//  App Router uses React Server Components with the ability to fetch data directly inside components
//  via async functions and new hooks like `use()` for data fetching.

// Gotcha: These data-fetching approaches are not interchangeable. You can’t use getStaticProps or getServerSideProps
// in the app/ directory, and you can’t use the new server-side components and use() hooks in the pages/ directory.

// 4. Different Handling of Client-Side Navigation

// Pages Router uses the traditional Next.js Link component for client-side navigation, which is still available in the App Router.
// App Router leverages React Server Components for navigation and rendering, which allows for more fine-grained control
// over how data is fetched and how pages transition.

// Gotcha: Navigation behaviors might differ between the app/ and pages/ directories,
// especially if you’re relying on advanced features like Suspense in the App Router.
// The experience of transitioning between pages might not be consistent if you mix pages from both routers.

// 5. SSR and SSG Differences

//  Both routers support SSR (Server-Side Rendering) and SSG (Static Site Generation), but they handle it differently:
//  In the App Router, SSR and SSG are more implicit, leveraging React’s streaming capabilities.
//  In the Pages Router, you have to explicitly define whether a page should be rendered server-side
//  (via getServerSideProps) or statically (via getStaticProps).

// Gotcha: Pages in the app/ directory will use the streaming capabilities and are more optimized for server-side rendering,
// but pages in the pages/ directory will rely on the traditional Next.js SSR/SSG mechanisms.
// This could lead to different performance characteristics or behaviors between the two.

// 6. Global CSS Conflicts

// In Next.js, global CSS can only be imported in specific places:
// - In the Pages Router, global CSS should be imported in the _app.js file.
// - In the App Router, global CSS should be imported in the root layout file (layout.js).

// Gotcha: If you’re using both routing systems, you might accidentally import global CSS in multiple places,
// leading to style conflicts or duplication in the final build.

// Tip: Ensure that you’re managing global CSS appropriately,
// either in _app.js or in the layout.js at the root of your app/ directory, but not both.

// 7. Middleware and API Routes

// Middleware applies to both routing systems, but there may be differences in how you handle specific logic
// for routes in the pages/ directory vs. the app/ directory.

// API Routes are typically defined in the pages/api/ directory, and if you’re using the app/ directory,
// you might need to explicitly configure or organize how API routes interact with your app.

// Gotcha: Mixing routing systems might cause confusion when determining where to define middleware logic or API routes,
// especially since API routes are conventionally located in the `pages` directory but might be accessed
// by routes in the `app/` directory.

// Tip: Clearly separate your API routes and middleware logic to avoid routing or access issues.
// If possible, keep API routes within pages/api for consistency.

// 8. Nested Routing Behavior

// App Router supports nested layouts and routes out of the box, allowing you to define deeply nested structures
// with shared layouts. The Pages Router doesn’t have this built-in feature,
// so you may need to structure your components and routes differently if you’re mixing routing systems.

// Gotcha: If you’re transitioning from Pages Router to App Router, be mindful that nested routes
// and layouts behave differently and may require some refactoring.

// Tip: Use the app/ directory for complex routing structures that require nested layouts and components.

// 9. App-Specific Features

// Some features, like React Server Components, streaming, and the new Suspense mechanism for loading data,
// are only available in the App Router.

// Gotcha: If you’re using these features in the app/ directory, you won’t be able to directly use them
// in the pages/ directory. You might have to rewrite or adapt certain components if you’re planning to migrate
// from the Pages Router to the App Router gradually.

// Tip: Keep features that rely on the new React capabilities in the app/ directory,
//      and don’t try to mix these advanced features in pages that use the Pages Router.

// Summary of Gotchas:

// - Routing conflicts: App Router takes priority over Pages Router.
// - Layouts: Layouts in app/ don’t apply to pages in pages/.
// - Data fetching: Different methods are used in app/ vs pages/.
// - Navigation: Client-side navigation can behave differently.
// - SSR/SSG: Rendering approaches differ between the routers.
// - Global CSS: Avoid conflicts by importing CSS in the right place.
// - Middleware/API: Clear separation of logic is needed for mixed routing.
// - App-specific features: Some features are exclusive to the App Router.
