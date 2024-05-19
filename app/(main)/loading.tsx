import { Loader2 } from "lucide-react";

export default function HomepageLoading() {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin size-4 text-slate-500" />
    </div>
  )
}