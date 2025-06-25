import { setRequestLocale } from "next-intl/server";
// src/app/page.tsx;
import { redirect } from "next/navigation";
// export const dynamic = "force-dynamic";
setRequestLocale("pl");
// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect("/pl");
}
