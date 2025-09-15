"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { authStore } from "../store/authStore"
import { ShoppingCart } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, checkAuthStatus, clearAuth } = authStore()

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/[...better-auth]", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: "signout" })
      })
      clearAuth()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const navigationLinks = [{ name: "Collections", href: "/collections" }]

  return (
    <nav className="bg-white border-b border-light-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image src="/logo-dark.png" alt="Laced Logo" width={100} height={100} className="h-16 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                {navigationLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-dark-900 hover:text-black px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {/* Cart Icon */}
              <Link href="/cart" className="text-dark-900 hover:text-black transition-colors duration-200 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-dark-900">Welcome, {user?.name || user?.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-dark-900 hover:text-black text-body-medium font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/sign-in"
                    className="text-dark-900 hover:text-black text-body-medium font-medium transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="bg-dark-900 text-light-100 px-4 py-2 rounded-lg font-medium hover:bg-dark-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-900 hover:text-black p-2 rounded-md transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-light-300">
              {navigationLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-dark-900 hover:text-black block px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-light-300 pt-4 mt-4">
                {/* Mobile Cart */}
                <Link
                  href="/cart"
                  className="text-dark-900 hover:text-black block px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart (2)</span>
                  </div>
                </Link>

                {/* Mobile Auth Section */}
                {isAuthenticated ? (
                  <div className="pt-4 space-y-2">
                    <div className="px-3 py-2 text-dark-900">Welcome, {user?.name || user?.email}</div>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left text-dark-900 hover:text-black px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 space-y-2">
                    <Link
                      href="/sign-in"
                      className="text-dark-900 hover:text-black block px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="bg-dark-900 text-light-100 block px-3 py-2 rounded-lg font-medium hover:bg-dark-700 transition-colors duration-200 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
