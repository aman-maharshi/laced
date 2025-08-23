import React from "react"
import ProductsList from "./components/ProductsList"

const Home = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center items-center">
        <h1 className="text-heading-2">Laced</h1>
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <ProductsList />
      </div>
    </div>
  )
}

export default Home
