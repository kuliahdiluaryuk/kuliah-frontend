import { MainNav } from "@/components/layouts/main-nav" 

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainNav />
      {children}
    </>
  )
}
