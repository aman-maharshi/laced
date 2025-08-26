import { db } from "./index"
import { products } from "./schema"

const nikeProducts = [
  {
    name: "Nike Air Max 270",
    brand: "Nike",
    category: "Lifestyle",
    price: "150.00",
    description:
      "The Nike Air Max 270 delivers unrivaled comfort with its iconic Air unit. Features a breathable mesh upper and lightweight foam midsole for all-day wear.",
    imageUrl: "/shoes/shoe-1.jpg",
    inStock: 35
  },
  {
    name: "Nike Zoom Fly 5",
    brand: "Nike",
    category: "Running",
    price: "160.00",
    description:
      "The Nike Zoom Fly 5 combines responsive ZoomX foam with a carbon fiber plate for explosive speed. Perfect for tempo runs and race day performance.",
    imageUrl: "/shoes/shoe-2.webp",
    inStock: 28
  },
  {
    name: "Nike Air Jordan 1 Low",
    brand: "Nike",
    category: "Lifestyle",
    price: "110.00",
    description:
      "The iconic Air Jordan 1 Low features premium leather construction and classic basketball styling. A timeless design that works for any occasion.",
    imageUrl: "/shoes/shoe-3.webp",
    inStock: 22
  },
  {
    name: "Nike React Infinity Run 3",
    brand: "Nike",
    category: "Running",
    price: "160.00",
    description:
      "The Nike React Infinity Run 3 offers superior cushioning and stability for long-distance runs. Features React foam technology and a supportive heel clip.",
    imageUrl: "/shoes/shoe-4.webp",
    inStock: 18
  },
  {
    name: "Nike Dunk High",
    brand: "Nike",
    category: "Lifestyle",
    price: "115.00",
    description:
      "The Nike Dunk High elevates the classic basketball silhouette with premium materials and retro styling. Perfect for streetwear and casual looks.",
    imageUrl: "/shoes/shoe-5.avif",
    inStock: 25
  },
  {
    name: "Nike Vaporfly",
    brand: "Nike",
    category: "Running",
    price: "250.00",
    description:
      "The Nike Vaporfly is engineered for record-breaking performance with ZoomX foam and a carbon fiber plate. The ultimate racing shoe.",
    imageUrl: "/shoes/shoe-6.avif",
    inStock: 15
  },
  {
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    category: "Lifestyle",
    price: "100.00",
    description:
      "The Nike Air Force 1 '07 maintains the classic basketball aesthetic with premium leather and Air-Sole unit for lightweight cushioning.",
    imageUrl: "/shoes/shoe-7.avif",
    inStock: 30
  },
  {
    name: "Nike ZoomX Invincible Run",
    brand: "Nike",
    category: "Running",
    price: "180.00",
    description:
      "The Nike ZoomX Invincible Run delivers maximum cushioning with ZoomX foam and a supportive heel clip. Ideal for recovery runs and easy miles.",
    imageUrl: "/shoes/shoe-8.avif",
    inStock: 20
  },
  {
    name: "Nike SB Dunk Low Pro",
    brand: "Nike",
    category: "Skateboarding",
    price: "95.00",
    description:
      "The Nike SB Dunk Low Pro features a padded tongue and Zoom Air unit for skateboarding performance. Durable construction meets classic style.",
    imageUrl: "/shoes/shoe-9.avif",
    inStock: 18
  },
  {
    name: "Nike Air Zoom Tempo",
    brand: "Nike",
    category: "Running",
    price: "200.00",
    description:
      "The Nike Air Zoom Tempo combines ZoomX foam with Zoom Air units for responsive training. Perfect for tempo runs and workouts.",
    imageUrl: "/shoes/shoe-10.avif",
    inStock: 16
  },
  {
    name: "Nike Blazer Mid '77",
    brand: "Nike",
    category: "Lifestyle",
    price: "85.00",
    description:
      "The Nike Blazer Mid '77 features a classic basketball-inspired design with premium leather construction. Timeless style meets modern comfort.",
    imageUrl: "/shoes/shoe-11.avif",
    inStock: 24
  },
  {
    name: "Nike Zoom Fly 4",
    brand: "Nike",
    category: "Running",
    price: "140.00",
    description:
      "The Nike Zoom Fly 4 offers responsive cushioning with React foam and a carbon fiber plate. Ideal for tempo runs and race preparation.",
    imageUrl: "/shoes/shoe-12.avif",
    inStock: 19
  },
  {
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "Lifestyle",
    price: "130.00",
    description:
      "The Nike Air Max 90 features the iconic Air unit and classic design elements. Premium materials and timeless style for everyday wear.",
    imageUrl: "/shoes/shoe-13.avif",
    inStock: 26
  },
  {
    name: "Nike React Miler 2",
    brand: "Nike",
    category: "Running",
    price: "120.00",
    description:
      "The Nike React Miler 2 provides stable cushioning with React foam technology. Perfect for daily training and long-distance runs.",
    imageUrl: "/shoes/shoe-14.avif",
    inStock: 21
  },
  {
    name: "Nike Air Jordan 1 Mid",
    brand: "Nike",
    category: "Lifestyle",
    price: "125.00",
    description:
      "The Nike Air Jordan 1 Mid elevates the classic basketball silhouette with premium materials and iconic styling. A must-have for sneaker enthusiasts.",
    imageUrl: "/shoes/shoe-15.avif",
    inStock: 17
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
