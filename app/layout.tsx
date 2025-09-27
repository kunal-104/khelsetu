import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Khelsetu - AI Sports Assessment Platform",
  description: "Democratizing sports talent assessment through AI-powered mobile platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen stadium-bg">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
