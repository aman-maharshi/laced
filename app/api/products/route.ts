import { NextResponse } from "next/server"
import { db } from "@/app/db"
import { products } from "@/app/db/schema"

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not found in environment variables")
      return NextResponse.json(
        {
          success: false,
          error: "Database connection not configured. Please set DATABASE_URL in .env.local"
        },
        { status: 500 }
      )
    }

    console.log("Attempting to connect to database...")
    const allProducts = await db.select().from(products).orderBy(products.createdAt)

    return NextResponse.json({
      success: true,
      data: allProducts,
      count: allProducts.length
    })
  } catch (error) {
    console.error("Error fetching products:", error)

    // Return more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
