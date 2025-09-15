import React from "react"
import Image from "next/image"

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-bg.png" alt="Hero Background" fill className="object-cover" priority />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-pink-400 text-sm font-medium tracking-wide uppercase">Bold & Sporty</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Style That Moves
                  <br />
                  <span>With You.</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl max-w-lg leading-relaxed">
                Not just style. Not just comfort. Footwear that effortlessly moves with your every step.
              </p>

              <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                Find Your Shoe
              </button>
            </div>

            {/* Right Side - Shoe Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <Image
                  src="/hero-shoe.png"
                  alt="Featured Sneaker"
                  width={600}
                  height={600}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Gradient Overlay */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/30 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default HeroSection
