import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Laced",
  description: "Get your favourite sneakers",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
