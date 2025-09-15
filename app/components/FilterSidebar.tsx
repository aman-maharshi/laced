"use client"

import React, { useState } from "react"

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    kids: true,
    price: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const productTypes = ["Low Top", "High Top", "Skateboarding", "Nike By You"]

  const genderOptions = ["Men", "Women", "Unisex"]

  const kidsOptions = ["Boys", "Girls"]

  const priceRanges = ["$25 - $50", "$50 - $100", "$100 - $150", "Over $150"]

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      {/* Product Type Filters */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Type</h3>
        <div className="space-y-3">
          {productTypes.map(type => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection("gender")}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Gender</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${expandedSections.gender ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {expandedSections.gender && (
          <div className="space-y-3">
            {genderOptions.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Kids Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection("kids")}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Kids</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${expandedSections.kids ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {expandedSections.kids && (
          <div className="space-y-3">
            {kidsOptions.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Shop By Price</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            {priceRanges.map(range => (
              <label key={range} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar
