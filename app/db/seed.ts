import { db } from "./index"
import { products } from "./schema"

const nikeProducts = [
  {
    name: "Nike Air Max 270",
    brand: "Nike",
    category: "Sneakers",
    price: "150.00",
    description:
      "The Nike Air Max 270 delivers unrivaled, all-day comfort. The shoe's design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    inStock: 25
  },
  {
    name: "Nike ZoomX Vaporfly NEXT% 2",
    brand: "Nike",
    category: "Running",
    price: "250.00",
    description:
      "The Nike ZoomX Vaporfly NEXT% 2 is designed for elite runners who want to break records. It features a carbon fiber plate and ZoomX foam for maximum energy return.",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    inStock: 15
  },
  {
    name: "Nike Air Jordan 1 Retro High",
    brand: "Nike",
    category: "Basketball",
    price: "170.00",
    description:
      "The Air Jordan 1 Retro High features a classic design with premium leather construction and the iconic Air-Sole unit for lightweight cushioning.",
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    inStock: 30
  },
  {
    name: "Nike Dri-FIT Training Shorts",
    brand: "Nike",
    category: "Athletic Wear",
    price: "45.00",
    description:
      "These Nike Dri-FIT training shorts are made with breathable fabric that wicks away sweat to help you stay dry and comfortable during your workout.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    inStock: 50
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
