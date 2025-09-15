import Image from "next/image"
import { Product } from "@/lib/db/schema"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-80 w-full bg-white flex-shrink-0">
        <Image
          src={product.imageUrl || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Heart Icon */}
        {/* <div className="absolute top-3 right-3 w-6 h-6 cursor-pointer">
          <Image
            src="/icons/heart.svg"
            alt="Heart icon"
            width={24}
            height={24}
            className="w-full h-full hover:scale-110 transition-transform"
          />
        </div> */}
      </div>

      <div className="p-4 bg-white flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <span className="font-medium text-gray-900">${Number(product.price).toFixed(2)}</span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-sm text-gray-600">4 Colour</p>
        </div>
      </div>
    </div>
  )
}
