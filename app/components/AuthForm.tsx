"use client"

import { useState } from "react"
import Link from "next/link"

interface AuthFormProps {
  mode: "signin" | "signup"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement authentication logic
    console.log(`${mode} form submitted:`, formData)

    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isSignUp = mode === "signup"
  const title = isSignUp ? "Join Laced Today!" : "Welcome Back!"
  const subtitle = isSignUp
    ? "Create your account to start your sneaker journey"
    : "Sign in to your account to continue"
  const submitText = isSignUp ? "Sign Up" : "Sign In"
  const toggleText = isSignUp ? "Already have an account?" : "Don't have an account?"
  const toggleLink = isSignUp ? "/sign-in" : "/sign-up"
  const toggleLinkText = isSignUp ? "Sign In" : "Sign Up"

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">{title}</h1>
        <p className="text-dark-500">{subtitle}</p>
      </div>

      {/* Social Providers */}
      <SocialProviders mode={mode} />

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-light-100 text-dark-500">Or {mode === "signup" ? "sign up" : "sign in"} with</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignUp && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-dark-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required={isSignUp}
              className="w-full px-4 py-3 border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors placeholder:text-dark-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-900 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="johndoe@gmail.com"
            required
            className="w-full px-4 py-3 border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors placeholder:text-dark-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark-900 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={isSignUp ? "minimum 8 characters" : "Enter your password"}
              required
              minLength={isSignUp ? 8 : undefined}
              className="w-full px-4 py-3 pr-12 border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-colors placeholder:text-dark-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-500 hover:text-dark-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-dark-900 text-light-100 py-3 px-4 rounded-lg font-medium hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-light-100 border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            submitText
          )}
        </button>
      </form>

      {/* Toggle Link */}
      <div className="text-center mt-6">
        <span className="text-dark-500">{toggleText} </span>
        <Link href={toggleLink} className="text-dark-900 font-medium transition-colors underline">
          {toggleLinkText}
        </Link>
      </div>
    </div>
  )
}

// Import SocialProviders component
import SocialProviders from "./SocialProviders"
