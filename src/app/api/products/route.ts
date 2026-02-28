import { NextResponse } from 'next/server'

// Simple mock products data
const products = [
  { id: 1, name: 'Ruby Stone', price: 299, category: 'precious', image: '/n1.jpeg', inStock: true },
  { id: 2, name: 'Sapphire', price: 399, category: 'precious', image: '/n2.jpeg', inStock: true },
  { id: 3, name: 'Emerald', price: 499, category: 'precious', image: '/n3.jpeg', inStock: true },
  { id: 4, name: 'Amethyst', price: 199, category: 'semi-precious', image: '/n4.jpeg', inStock: true },
  { id: 5, name: 'Topaz', price: 249, category: 'semi-precious', image: '/n5.jpeg', inStock: false },
  { id: 6, name: 'Rose Quartz', price: 89, category: 'crystals', image: '/n6.jpeg', inStock: true },
]

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const inStock = searchParams.get('inStock')

    // Filter products
    let filtered = [...products]

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (inStock === 'true') {
      filtered = filtered.filter(p => p.inStock)
    }

    return NextResponse.json({ 
      success: true, 
      products: filtered 
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Simple validation
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Create new product
    const newProduct = {
      id: Date.now(),
      name: body.name,
      price: body.price,
      category: body.category || 'general',
      image: body.image || '/default.jpg',
      inStock: body.inStock ?? true
    }

    return NextResponse.json({ 
      success: true, 
      product: newProduct 
    }, { status: 201 })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}