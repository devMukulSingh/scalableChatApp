// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { httpBatchLink } from "@trpc/client";
// import { ReactNode, useState } from "react";

// function TRPCProvider({children} : {children:ReactNode}) {
//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({
//           url: "http://localhost:8000/trpc",
//           fetch(url, options) {
//             return fetch(url, {
//               ...options,
//               credentials: "include",
//             });
//           },
//         }),
//       ],
//     })
//   );
//   return (
//     <>
//       <trpc.Provider client={trpcClient} queryClient={queryClient}>
//         <QueryClientProvider client={queryClient}>
//           {children}
//         </QueryClientProvider>
//       </trpc.Provider>
//     </>
//   );
// }

// export default TRPCProvider;
