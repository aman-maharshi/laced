import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"]
})

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
      <body className={`${jost.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
