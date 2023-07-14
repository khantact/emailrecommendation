import { Suspense } from "react"
import Navbar from "../components/navbar/Navbar"
import Loading from "./loading"
import { AuthProvider } from '../context/authContext'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="text-peach font-serif bg-indigo-950">
      <body suppressHydrationWarning={true}>
      <AuthProvider>
        <div className=" top-0 left-0 right-0 z-50 fixed">
          <Navbar/>
        </div>
        <div className="">
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
        </div>
      </AuthProvider>
      </body>
    </html>
  )
}
