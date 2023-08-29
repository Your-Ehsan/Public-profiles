import { siteconfigs } from "@/constants"
import "@/styles/globals.css"
export const metadata = {
  title: siteconfigs.title,
  description: siteconfigs.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
