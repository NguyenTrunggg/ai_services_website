import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from 'next/headers'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Automated Services",
  description: "Providing automated AI services for businesses",
  generator: 'v0.dev'
}

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const layoutType = headersList.get('x-layout-type')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {layoutType === 'default' ? (
            <DefaultLayout>{children}</DefaultLayout>
          ) : (
            children
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
