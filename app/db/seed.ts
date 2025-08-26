import { db } from "./index"
import { products } from "./schema"

const nikeProducts = [
  {
    name: "Nike Air Jordan 1",
    brand: "Nike",
    category: "Basketball",
    price: "170.00",
    description:
      "The Air Jordan 1 Retro High features a classic design with premium leather construction and the iconic Air-Sole unit for lightweight cushioning.",
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    inStock: 30
  },
  {
    name: "Nike Metcon 7",
    brand: "Nike",
    category: "CrossFit",
    price: "130.00",
    description:
      "The Nike Metcon 7 is built for the rigors of CrossFit training with a breathable upper and stable platform for lifting and dynamic movements.",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    inStock: 20
  },
  {
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "Lifestyle",
    price: "100.00",
    description:
      "The Nike Air Force 1 is a timeless classic with a clean, minimalist design. Perfect for everyday wear with premium leather construction and Air-Sole cushioning.",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    inStock: 40
  },
  {
    name: "Nike Dunk Low",
    brand: "Nike",
    category: "Lifestyle",
    price: "110.00",
    description:
      "The Nike Dunk Low offers a versatile design that works for both casual and athletic wear. Features a padded collar and rubber outsole for durability.",
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop",
    inStock: 35
  },
  {
    name: "Nike Pegasus 40",
    brand: "Nike",
    category: "Running",
    price: "130.00",
    description:
      "The Nike Pegasus 40 is a versatile daily trainer with responsive cushioning and breathable mesh upper. Perfect for runners of all levels.",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    inStock: 28
  },
  {
    name: "Nike Blazer Mid",
    brand: "Nike",
    category: "Lifestyle",
    price: "85.00",
    description:
      "The Nike Blazer Mid features a classic basketball-inspired design with a mid-top silhouette. Made with premium materials for lasting comfort and style.",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    inStock: 22
  },
  {
    name: "Nike React Vision",
    brand: "Nike",
    category: "Running",
    price: "120.00",
    description:
      "The Nike React Vision combines React foam technology with a breathable upper for a smooth, responsive running experience. Ideal for daily training runs.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    inStock: 18
  }
]

async function seed() {
  try {
    console.log("🌱 Seeding database...")

    // Clear existing products
    await db.delete(products)

    // Insert new products
    const insertedProducts = await db.insert(products).values(nikeProducts).returning()

    console.log(`✅ Seeded ${insertedProducts.length} products`)
    console.log(
      "Products:",
      insertedProducts.map(p => ({ name: p.name, price: p.price }))
    )
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

export { seed }
