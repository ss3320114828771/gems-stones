// Ultra simple order types - NO ERRORS

export type Order = {
  id: string
  userId: string
  userName: string
  items: any[]
  total: number
  status: string
  createdAt: string
}

export type CreateOrderData = {
  userId: string
  userName: string
  items: any[]
  total: number
}