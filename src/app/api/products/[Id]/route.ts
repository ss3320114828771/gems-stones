import { NextResponse } from 'next/server'

// Mock products data
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = parseInt(id)
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const product = products.find(p => p.id === productId)

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      product 
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch product' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = parseInt(id)
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Find product
    const productIndex = products.findIndex(p => p.id === productId)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Update product (in real app, update database)
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id: productId
    }

    return NextResponse.json({ 
      success: true, 
      message: `Product ${productId} updated successfully`,
      product: updatedProduct
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update product' 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = parseInt(id)
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    // Find product
    const product = products.find(p => p.id === productId)
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // In real app, delete from database
    return NextResponse.json({ 
      success: true, 
      message: `Product ${productId} deleted successfully`
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete product' 
      },
      { status: 500 }
    )
  }
}

// PATCH /api/products/[id] - Partially update product
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = parseInt(id)
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Find product
    const productIndex = products.findIndex(p => p.id === productId)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Partially update product
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id: productId
    }

    return NextResponse.json({ 
      success: true, 
      message: `Product ${productId} updated partially`,
      product: updatedProduct
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update product' 
      },
      { status: 500 }
    )
  }
}

// HEAD /api/products/[id] - Check if product exists
export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = parseInt(id)
    
    if (isNaN(productId)) {
      return new NextResponse(null, { status: 400 })
    }

    const product = products.find(p => p.id === productId)

    if (!product) {
      return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(null, { status: 200 })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}

// OPTIONS /api/products/[id] - Get allowed methods
export async function OPTIONS() {
  return NextResponse.json({
    methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
  })
}