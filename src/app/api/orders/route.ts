import { NextResponse } from 'next/server'

// Mock orders data storage (in real app, this would be a database)
let orders: any[] = [
  {
    id: 'ord_1',
    orderNumber: 'ORD-240115-001',
    userId: '1',
    userName: 'Hafiz Sajid Syed',
    userEmail: 'sajid.syed@gmail.com',
    items: [
      { 
        productId: 1, 
        productName: 'Ruby Stone', 
        price: 299, 
        quantity: 1,
        subtotal: 299,
        image: '/n1.jpeg'
      }
    ],
    subtotal: 299,
    shipping: 10,
    tax: 29.9,
    total: 338.9,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    shippingAddress: {
      fullName: 'Hafiz Sajid Syed',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ord_2',
    orderNumber: 'ORD-240116-002',
    userId: '3',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    items: [
      { 
        productId: 2, 
        productName: 'Blue Sapphire', 
        price: 399, 
        quantity: 2,
        subtotal: 798,
        image: '/n2.jpeg'
      }
    ],
    subtotal: 798,
    shipping: 15,
    tax: 79.8,
    total: 892.8,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'USA'
    },
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  }
]

// GET /api/orders - Get all orders (admin) or user orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    let filteredOrders = [...orders]

    // Filter by user ID
    if (userId) {
      filteredOrders = filteredOrders.filter(order => order.userId === userId)
    }

    // Filter by order ID
    if (orderId) {
      filteredOrders = filteredOrders.filter(order => order.id === orderId)
    }

    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    // Sort by date (newest first)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Apply limit
    if (limit) {
      filteredOrders = filteredOrders.slice(0, parseInt(limit))
    }

    // Calculate statistics
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const processingOrders = orders.filter(o => o.status === 'processing').length
    const completedOrders = orders.filter(o => o.status === 'delivered').length
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

    return NextResponse.json({
      success: true,
      orders: filteredOrders,
      total: filteredOrders.length,
      stats: {
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        totalRevenue
      }
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.userId || !body.userName || !body.userEmail || !body.items || !body.shippingAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate order number
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const orderNumber = `ORD-${year}${month}${day}-${random}`

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    )
    const tax = subtotal * 0.1 // 10% tax
    const shipping = body.shipping || 10
    const total = subtotal + tax + shipping

    // Create new order
    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber,
      ...body,
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      paymentStatus: body.paymentStatus || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to mock database
    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201 })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// PUT /api/orders - Update order status
export async function PUT(request: Request) {
  try {
    const { orderId, status, paymentStatus, trackingNumber } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const orderIndex = orders.findIndex(o => o.id === orderId)

    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update order
    if (status) orders[orderIndex].status = status
    if (paymentStatus) orders[orderIndex].paymentStatus = paymentStatus
    if (trackingNumber) orders[orderIndex].trackingNumber = trackingNumber
    
    orders[orderIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
      message: 'Order updated successfully'
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

// DELETE /api/orders - Cancel order
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const orderIndex = orders.findIndex(o => o.id === orderId)

    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    // Instead of deleting, mark as cancelled
    orders[orderIndex].status = 'cancelled'
    orders[orderIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully'
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to cancel order' },
      { status: 500 }
    )
  }
}