import { NextResponse } from 'next/server'

// Same mock products data
const products = [
  { id: 1, name: 'Ruby Stone', price: 299, category: 'precious', image: '/n1.jpeg', inStock: true },
  { id: 2, name: 'Sapphire', price: 399, category: 'precious', image: '/n2.jpeg', inStock: true },
  { id: 3, name: 'Emerald', price: 499, category: 'precious', image: '/n3.jpeg', inStock: true },
  { id: 4, name: 'Amethyst', price: 199, category: 'semi-precious', image: '/n4.jpeg', inStock: true },
  { id: 5, name: 'Topaz', price: 249, category: 'semi-precious', image: '/n5.jpeg', inStock: false },
  { id: 6, name: 'Rose Quartz', price: 89, category: 'crystals', image: '/n6.jpeg', inStock: true },
]

// GET /api/products/[id] - Get single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const product = products.find(p => p.id === id)

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, product })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    
    // In real app, update database
    return NextResponse.json({ 
      success: true, 
      message: `Product ${id} updated` 
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    // In real app, delete from database
    return NextResponse.json({ 
      success: true, 
      message: `Product ${id} deleted` 
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}