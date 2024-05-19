import { AppType } from "@/app/api/[[...routes]]/route";
import { hc } from "hono/client";

export const honoClient = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!); 