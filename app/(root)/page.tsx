import React from "react"
import ProductsList from "../components/ProductsList"

const Home = () => {
  return (
    <div className="flex-1">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold font-jost text-dark-900 mb-4">Latest Sneakers</h1>
        </div>

        <ProductsList />
      </div>
    </div>
  )
}

export default Home
