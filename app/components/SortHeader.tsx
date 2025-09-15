"use client"

import React, { useState } from "react"

interface SortHeaderProps {
  showFilters: boolean
  onToggleFilters: () => void
}

const SortHeader = ({ showFilters, onToggleFilters }: SortHeaderProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("Featured")

  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Best Sellers",
    "Customer Rating"
  ]

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Hide Filters Button */}
      <button
        onClick={onToggleFilters}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span className="text-sm font-medium">{showFilters ? "Hide Filters" : "Show Filters"}</span>
      </button>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-sm font-medium">Sort By</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${isSortOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isSortOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div className="py-1">
              {sortOptions.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedSort(option)
                    setIsSortOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    selectedSort === option ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SortHeader
