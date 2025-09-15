"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { Product } from "@/lib/db/schema"

export default function ProductsHome() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      const data = await response.json()

      if (data.success) {
        setProducts(data.data)
      } else {
        setError(data.error || "Failed to fetch products")
      }
    } catch (err) {
      setError("Failed to fetch products")
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
        {error.includes("DATABASE_URL") && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm mb-2">
              <strong>Database not configured:</strong> You need to set up your database connection.
            </p>
            <div className="text-left text-sm text-yellow-700">
              <p>
                1. Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file
              </p>
              <p>
                2. Add your <code className="bg-yellow-100 px-1 rounded">DATABASE_URL</code>
              </p>
              <p>
                3. Run <code className="bg-yellow-100 px-1 rounded">npm run db:setup</code>
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 3).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
