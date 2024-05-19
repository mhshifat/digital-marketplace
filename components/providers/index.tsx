import { PropsWithChildren } from "react";
import { Toaster } from 'sonner';
import QueryProvider from "./query-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <Toaster />
      {children}
    </QueryProvider>
  )
}