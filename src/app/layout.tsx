import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Sandbox IDE',
  description: 'A 3D world sandbox editor with Next.js and React Three Fiber',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
