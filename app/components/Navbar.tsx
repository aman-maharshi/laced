"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationLinks = [
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Kids", href: "/kids" },
    { name: "Collections", href: "/collections" },
    { name: "Contact", href: "/contact" }
  ]

  const rightLinks = [
    { name: "Search", href: "/search" },
    { name: "My Cart (2)", href: "/cart" }
  ]

  return (
    <nav className="bg-white border-b border-light-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo-dark.png" alt="Laced Logo" width={100} height={100} className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-dark-900 hover:text-green-600 px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {rightLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-dark-900 hover:text-green-600 text-body-medium font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-900 hover:text-green-600 p-2 rounded-md transition-colors duration-200"
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
                  className="text-dark-900 hover:text-green-600 block px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-light-300 pt-4 mt-4">
                {rightLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-dark-900 hover:text-green-600 block px-3 py-2 text-body-medium font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
