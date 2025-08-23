import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const footerColumns = [
    {
      title: "Featured",
      links: [
        { name: "Air Force 1", href: "/products/air-force-1" },
        { name: "Huarache", href: "/products/huarache" },
        { name: "Air Max 90", href: "/products/air-max-90" },
        { name: "Air Max 95", href: "/products/air-max-95" }
      ]
    },
    {
      title: "Shoes",
      links: [
        { name: "All Shoes", href: "/shoes" },
        { name: "Custom Shoes", href: "/shoes/custom" },
        { name: "Jordan Shoes", href: "/shoes/jordan" },
        { name: "Running Shoes", href: "/shoes/running" }
      ]
    },
    {
      title: "Clothing",
      links: [
        { name: "All Clothing", href: "/clothing" },
        { name: "Modest Wear", href: "/clothing/modest" },
        { name: "Hoodies & Pullovers", href: "/clothing/hoodies" },
        { name: "Shirts & Tops", href: "/clothing/shirts" }
      ]
    },
    {
      title: "Kids'",
      links: [
        { name: "Infant & Toddler Shoes", href: "/kids/infant" },
        { name: "Kids' Shoes", href: "/kids/shoes" },
        { name: "Kids' Jordan Shoes", href: "/kids/jordan" },
        { name: "Kids' Basketball Shoes", href: "/kids/basketball" }
      ]
    }
  ]

  const socialLinks = [
    { name: "Twitter/X", href: "/social/twitter", icon: "/x.svg" },
    { name: "Facebook", href: "/social/facebook", icon: "/facebook.svg" },
    { name: "Instagram", href: "/social/instagram", icon: "/instagram.svg" }
  ]

  const legalLinks = [
    { name: "Guides", href: "/guides" },
    { name: "Terms of Sale", href: "/terms/sale" },
    { name: "Terms of Use", href: "/terms/use" },
    { name: "Nike Privacy Policy", href: "/privacy" }
  ]

  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and Featured Column */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image src="/logo.svg" alt="Laced Logo" width={32} height={32} className="h-6 w-auto mb-4" />
            </div>
          </div>

          <div>
            <h3 className="text-body-medium font-medium text-white mb-4">Featured</h3>
            <ul className="space-y-2">
              {footerColumns[0].links.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-500 hover:text-white transition-colors duration-200 text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shoes Column */}
          <div>
            <h3 className="text-body-medium font-medium text-white mb-4">Shoes</h3>
            <ul className="space-y-2">
              {footerColumns[1].links.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-500 hover:text-white transition-colors duration-200 text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clothing Column */}
          <div>
            <h3 className="text-body-medium font-medium text-white mb-4">Clothing</h3>
            <ul className="space-y-2">
              {footerColumns[2].links.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-500 hover:text-white transition-colors duration-200 text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kids Column */}
          <div>
            <h3 className="text-body-medium font-medium text-white mb-4">Kids'</h3>
            <ul className="space-y-2">
              {footerColumns[3].links.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-500 hover:text-white transition-colors duration-200 text-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Image src={social.icon} alt={social.name} width={20} height={20} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Legal and Copyright */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Side - Location and Copyright */}
            <div className="flex items-center space-x-4 text-dark-500 text-footnote">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Mumbai</span>
              </div>
              <span>© 2025 Nike, Inc. All Rights Reserved</span>
            </div>

            {/* Right Side - Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-dark-500 text-footnote">
              {legalLinks.map(link => (
                <Link key={link.name} href={link.href} className="hover:text-white transition-colors duration-200">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
