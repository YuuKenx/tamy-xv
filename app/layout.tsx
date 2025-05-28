import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "XV Años de Tamy - 9 de Agosto 2025",
  description:
    "Te invitamos a celebrar los XV años de Tamy. Una celebración llena de amor, alegría y momentos inolvidables.",
  keywords: "XV años, quinceañera, Tamy, celebración, invitación, 9 de agosto 2025",
  authors: [{ name: "Familia de Tamy" }],
  openGraph: {
    title: "XV Años de Tamy",
    description: "Te invitamos a celebrar los XV años de Tamy - 9 de Agosto 2025",
    type: "website",
    locale: "es_ES",
  },
  icons: {
    icon: [
      {
        url: "/image/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/image/logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/image/logo.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/image/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/image/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/image/logo.png" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
