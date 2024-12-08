"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast from "react-hot-toast";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = 
    new QueryClient({
      defaultOptions: {
        queries: {
       
          refetchOnWindowFocus: false,
          retry: false,
        },
        mutations: {
          retry: false,

          onError(e){
            toast.error(`Something went wrong `)
            console.log(`Error in mutation`,e);
          }
        },
      },
    })
  

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
