import Image from "next/image"
import { Product } from "@/app/db/schema"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={product.imageUrl || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{product.brand}</span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              (product.inStock || 0) > 0 ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
            }`}
          >
            {(product.inStock || 0) > 0 ? `${product.inStock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </div>
  )
}
