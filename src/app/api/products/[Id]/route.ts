import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// Types
interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  inStock: boolean
}

interface RouteParams {
  params: Promise<{ id: string }>
}

// Mock products data
const products: Product[] = [
  { id: 1, name: 'Ruby Stone', price: 299, category: 'precious', image: '/n1.jpeg', inStock: true },
  { id: 2, name: 'Sapphire', price: 399, category: 'precious', image: '/n2.jpeg', inStock: true },
  { id: 3, name: 'Emerald', price: 499, category: 'precious', image: '/n3.jpeg', inStock: true },
  { id: 4, name: 'Amethyst', price: 199, category: 'semi-precious', image: '/n4.jpeg', inStock: true },
  { id: 5, name: 'Topaz', price: 249, category: 'semi-precious', image: '/n5.jpeg', inStock: false },
  { id: 6, name: 'Rose Quartz', price: 89, category: 'crystals', image: '/n6.jpeg', inStock: true },
]

// Helper function to validate ID
async function validateProductId(params: Promise<{ id: string }>): Promise<{ productId: number; error: NextResponse | null }> {
  try {
    const { id } = await params
    const productId = parseInt(id)
    
    if (isNaN(productId)) {
      return { 
        productId: NaN, 
        error: NextResponse.json(
          { success: false, error: 'Invalid product ID' },
          { status: 400 }
        )
      }
    }
    
    return { productId, error: null }
  } catch {
    return { 
      productId: NaN, 
      error: NextResponse.json(
        { success: false, error: 'Invalid params' },
        { status: 400 }
      )
    }
  }
}

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId, error } = await validateProductId(params)
    if (error) return error

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
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId, error } = await validateProductId(params)
    if (error) return error

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
    const updatedProduct: Product = {
      ...products[productIndex],
      ...body,
      id: productId,
      price: body.price ? Number(body.price) : products[productIndex].price
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
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId, error } = await validateProductId(params)
    if (error) return error

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
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId, error } = await validateProductId(params)
    if (error) return error

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
    const updatedProduct: Product = {
      ...products[productIndex],
      ...body,
      id: productId,
      price: body.price ? Number(body.price) : products[productIndex].price
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
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId, error } = await validateProductId(params)
    if (error) return new NextResponse(null, { status: 400 })

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
  }, {
    headers: {
      'Allow': 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS'
    }
  })
}