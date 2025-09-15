"use client"

import React, { useState } from "react"
import ProductsList from "../../components/ProductsList"
import FilterSidebar from "../../components/FilterSidebar"
import SortHeader from "../../components/SortHeader"

const CollectionsPage = () => {
  const [showFilters, setShowFilters] = useState(true)

  return (
    <div className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New (500)</h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <FilterSidebar />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Header */}
            <SortHeader showFilters={showFilters} onToggleFilters={() => setShowFilters(!showFilters)} />

            {/* Products Grid */}
            <div className="mt-6">
              <ProductsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionsPage
