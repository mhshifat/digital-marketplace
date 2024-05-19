import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      {children}
    </main>
  )
}