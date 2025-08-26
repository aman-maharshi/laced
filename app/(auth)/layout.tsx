import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Laced | Join the Sneaker Community",
  description: "Sign in or create your account to get your favourite sneakers"
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex">
          {/* Left Panel - Brand Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-dark-900 text-light-100 flex-col justify-between p-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-light-100 rounded-lg flex items-center justify-center">
                <img src="/logo-dark.png" alt="Laced" className="size-10" />
              </div>
              <span className="text-xl font-bold">Laced</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">Step Into Greatness</h1>
              <p className="text-lg text-light-300 max-w-md">
                Join thousands of sneaker enthusiasts who trust Laced for their authentic kicks and exclusive releases.
              </p>
            </div>

            <div className="text-sm text-light-300">© 2024 Laced. All rights reserved.</div>
          </div>

          {/* Right Panel - Form Section */}
          <div className="w-full lg:w-1/2 bg-light-100 flex flex-col items-center justify-center p-6 lg:p-12">
            {/* Logo for mobile and top of form */}
            <div className="lg:hidden mb-8 flex items-center space-x-3">
              <div className="w-10 h-10 bg-dark-900 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="Laced" className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-dark-900">Laced</span>
            </div>

            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
