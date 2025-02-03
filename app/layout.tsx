import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PersistentPlayer from "@/components/PersistentPlayer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asylum Studio",
  description: "Home of mind-freeing psychedelic music",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AudioPlayerProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <PersistentPlayer />
              <Footer />
            </div>
          </AudioPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

