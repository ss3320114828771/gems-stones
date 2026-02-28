import { NextResponse } from 'next/server'

// Mock cart data storage (in real app, this would be a database)
let carts: Record<string, any[]> = {}

// GET /api/cart?userId=123 - Get user's cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get cart for user
    const cart = carts[userId] || []

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      success: true,
      cart,
      subtotal,
      itemCount
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: Request) {
  try {
    const { userId, product } = await request.json()

    if (!userId || !product) {
      return NextResponse.json(
        { success: false, error: 'User ID and product are required' },
        { status: 400 }
      )
    }

    // Get existing cart
    if (!carts[userId]) {
      carts[userId] = []
    }

    // Check if product already in cart
    const existingItemIndex = carts[userId].findIndex(
      (item: any) => item.id === product.id
    )

    if (existingItemIndex >= 0) {
      // Update quantity
      carts[userId][existingItemIndex].quantity += 1
    } else {
      // Add new item
      carts[userId].push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    }

    // Calculate totals
    const cart = carts[userId]
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      success: true,
      cart,
      subtotal,
      itemCount,
      message: 'Item added to cart'
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - Update item quantity
export async function PUT(request: Request) {
  try {
    const { userId, productId, quantity } = await request.json()

    if (!userId || !productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'User ID, product ID, and quantity are required' },
        { status: 400 }
      )
    }

    if (!carts[userId]) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      )
    }

    const itemIndex = carts[userId].findIndex((item: any) => item.id === productId)

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found in cart' },
        { status: 404 }
      )
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      carts[userId].splice(itemIndex, 1)
    } else {
      // Update quantity
      carts[userId][itemIndex].quantity = quantity
    }

    const cart = carts[userId]
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      success: true,
      cart,
      subtotal,
      itemCount,
      message: quantity <= 0 ? 'Item removed from cart' : 'Cart updated'
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Remove item from cart or clear cart
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')
    const clear = searchParams.get('clear')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (!carts[userId]) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      )
    }

    if (clear === 'true') {
      // Clear entire cart
      carts[userId] = []
    } else if (productId) {
      // Remove specific item
      carts[userId] = carts[userId].filter((item: any) => item.id !== productId)
    } else {
      return NextResponse.json(
        { success: false, error: 'Product ID or clear flag required' },
        { status: 400 }
      )
    }

    const cart = carts[userId]
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      success: true,
      cart,
      subtotal,
      itemCount,
      message: clear === 'true' ? 'Cart cleared' : 'Item removed from cart'
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to delete from cart' },
      { status: 500 }
    )
  }
}