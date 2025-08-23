import React from "react"
import ProductsList from "./components/ProductsList"

const Home = () => {
  return (
    <div className="bg-gray-50 flex-1">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-heading-2 text-dark-900 mb-4">Premium Nike Collection</h1>
          <p className="text-lead text-dark-700">Discover our curated collection of Nike footwear and apparel</p>
        </div>

        <ProductsList />
      </div>
    </div>
  )
}

export default Home
