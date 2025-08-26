import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "../globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
