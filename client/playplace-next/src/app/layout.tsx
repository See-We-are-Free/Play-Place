import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Play, Place | 함께 만드는 공유 플레이리스트',
  description: 'Play, Place | 함께 만드는 공유 플레이리스트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
