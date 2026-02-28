// ========== PRODUCT CORE TYPES ==========

/**
 * Main product type
 */
export type Product = {
  id: string | number           // Unique product ID
  name: string                  // Product name
  slug: string                  // URL-friendly name (e.g., "ruby-stone")
  description: string           // Full product description
  shortDescription?: string     // Brief description for cards
  
  // Pricing
  price: number                 // Current price
  originalPrice?: number        // Original price (if on sale)
  cost?: number                 // Cost price (for profit calculation)
  
  // Inventory
  sku: string                   // Stock keeping unit
  barcode?: string              // Barcode/UPC
  quantity: number              // Available stock
  inStock: boolean              // Whether in stock
  lowStockThreshold?: number    // Alert when stock below this
  
  // Categorization
  category: string              // Main category
  subcategory?: string          // Subcategory
  tags: string[]                // Search tags
  collections?: string[]        // Collections/features (e.g., "new", "featured")
  
  // Media
  image: string                 // Main product image
  images: string[]              // Additional images
  video?: string                // Product video URL
  
  // Attributes
  weight?: string               // Weight (e.g., "2.5 carats")
  dimensions?: string           // Dimensions (e.g., "8x6mm")
  color?: string                // Primary color
  colors?: string[]             // Available colors
  sizes?: string[]              // Available sizes (FIXED: Added this field)
  clarity?: string              // Gem clarity (e.g., "VS")
  cut?: string                  // Gem cut (e.g., "Oval")
  origin?: string               // Country of origin
  material?: string             // Material (e.g., "14k Gold")
  
  // Metadata
  rating: number                // Average rating (0-5)
  reviewCount: number           // Number of reviews
  featured: boolean             // Whether featured
  isNew: boolean                // Whether new arrival
  isOnSale: boolean             // Whether on sale
  
  // SEO
  metaTitle?: string            // SEO title
  metaDescription?: string      // SEO description
  metaKeywords?: string[]       // SEO keywords
  
  // Dates
  createdAt: string             // Creation date
  updatedAt: string             // Last update date
  publishedAt?: string          // Publication date
  
  // Settings
  status: 'active' | 'draft' | 'archived'  // Product status
  visibility: 'public' | 'hidden' | 'members'  // Who can see
  
  // Relationships
  relatedProducts?: (string | number)[]  // Related product IDs
  upsellProducts?: (string | number)[]   // Upsell product IDs
  crossSellProducts?: (string | number)[] // Cross-sell product IDs
}

// ========== PRODUCT VARIANTS ==========

/**
 * Product variant (different color/size)
 */
export type ProductVariant = {
  id: string
  productId: string | number
  name: string
  sku: string
  price: number
  quantity: number
  image?: string
  attributes: Record<string, string>  // e.g., { color: "red", size: "large" }
}

// ========== PRODUCT SUMMARY ==========

/**
 * Product summary (for listings)
 */
export type ProductSummary = {
  id: string | number
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew: boolean
  isOnSale: boolean
}

// ========== PRODUCT CATEGORY ==========

/**
 * Product category
 */
export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
  productCount: number
  featured: boolean
}

// ========== PRODUCT REVIEW ==========

/**
 * Product review
 */
export type Review = {
  id: string
  productId: string | number
  userId: string
  userName: string
  rating: number
  title?: string
  content: string
  images?: string[]
  verified: boolean          // Verified purchase
  helpful: number            // Helpful votes
  createdAt: string
  updatedAt?: string
  status: 'pending' | 'approved' | 'rejected'
}

// ========== PRODUCT FILTERS ==========

/**
 * Product filter options
 */
export type ProductFilters = {
  // Basic filters
  category?: string
  subcategory?: string
  
  // Price range
  minPrice?: number
  maxPrice?: number
  
  // Status
  inStock?: boolean
  featured?: boolean
  isNew?: boolean
  onSale?: boolean
  
  // Attributes
  colors?: string[]
  sizes?: string[]              // FIXED: Added sizes filter
  clarity?: string[]
  cut?: string[]
  origin?: string[]
  
  // Search
  search?: string
  
  // Rating
  minRating?: number
  
  // Pagination
  page?: number
  limit?: number
}

/**
 * Product filter options with counts
 */
export type FilterWithCounts = {
  categories: Array<{ value: string; label: string; count: number }>
  colors: Array<{ value: string; label: string; count: number }>
  sizes: Array<{ value: string; label: string; count: number }>  // FIXED: Added sizes
  priceRanges: Array<{ min: number; max: number; label: string; count: number }>
  ratings: Array<{ value: number; label: string; count: number }>
}

// ========== PRODUCT SORTING ==========

/**
 * Product sort options
 */
export type ProductSortOptions = {
  field: 'price' | 'name' | 'rating' | 'createdAt' | 'popularity'
  direction: 'asc' | 'desc'
}

export const SORT_OPTIONS: ProductSortOptions[] = [
  { field: 'createdAt', direction: 'desc' },  // Newest
  { field: 'price', direction: 'asc' },       // Price low to high
  { field: 'price', direction: 'desc' },      // Price high to low
  { field: 'rating', direction: 'desc' },     // Highest rated
  { field: 'name', direction: 'asc' },        // Name A-Z
]

// ========== PRODUCT API RESPONSES ==========

/**
 * API response for single product
 */
export type ProductResponse = {
  success: boolean
  product?: Product
  error?: string
}

/**
 * API response for multiple products
 */
export type ProductsResponse = {
  success: boolean
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
  filters?: FilterWithCounts
  error?: string
}

// ========== PRODUCT CREATION ==========

/**
 * Data needed to create a product
 */
export type CreateProductData = Omit<
  Product,
  'id' | 'slug' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'
>

/**
 * Data for updating a product
 */
export type UpdateProductData = Partial<Omit<Product, 'id' | 'createdAt'>>

// ========== INVENTORY ==========

/**
 * Inventory adjustment
 */
export type InventoryAdjustment = {
  productId: string | number
  quantity: number
  type: 'add' | 'remove' | 'set'
  reason: string
  userId?: string
  createdAt: string
}

// ========== HELPER FUNCTIONS ==========

/**
 * Generate product slug from name
 */
export function generateProductSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(original: number, current: number): number {
  if (!original || original <= current) return 0
  return Math.round(((original - current) / original) * 100)
}

/**
 * Check if product is on sale
 */
export function isOnSale(product: Product): boolean {
  return !!product.originalPrice && product.originalPrice > product.price
}

/**
 * Check if product is low stock
 */
export function isLowStock(product: Product, threshold: number = 5): boolean {
  return product.inStock && product.quantity <= threshold
}

/**
 * Format price range for display
 */
export function formatPriceRange(min: number, max: number): string {
  return `$${min} - $${max}`
}

/**
 * Filter products by criteria
 */
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false
    }

    // Price range
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false
    }

    // Stock filter
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false
    }

    // Featured filter
    if (filters.featured !== undefined && product.featured !== filters.featured) {
      return false
    }

    // New filter
    if (filters.isNew !== undefined && product.isNew !== filters.isNew) {
      return false
    }

    // Sale filter
    if (filters.onSale !== undefined && product.isOnSale !== filters.onSale) {
      return false
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      if (!product.colors?.some(c => filters.colors?.includes(c))) {
        return false
      }
    }

    // Size filter - FIXED: Added size filtering
    if (filters.sizes && filters.sizes.length > 0) {
      if (!product.sizes?.some(s => filters.sizes?.includes(s))) {
        return false
      }
    }

    // Rating filter
    if (filters.minRating !== undefined && product.rating < filters.minRating) {
      return false
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase()
      const matches = 
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.tags?.some(tag => tag.toLowerCase().includes(search))
      
      if (!matches) return false
    }

    return true
  })
}

/**
 * Sort products
 */
export function sortProducts(
  products: Product[],
  { field, direction }: ProductSortOptions
): Product[] {
  return [...products].sort((a, b) => {
    let comparison = 0
    
    switch(field) {
      case 'price':
        comparison = a.price - b.price
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'rating':
        comparison = (a.rating || 0) - (b.rating || 0)
        break
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      case 'popularity':
        comparison = (a.reviewCount || 0) - (b.reviewCount || 0)
        break
      default:
        comparison = 0
    }
    
    return direction === 'asc' ? comparison : -comparison
  })
}

/**
 * Get unique values from products
 */
export function getUniqueValues<T extends keyof Product>(
  products: Product[],
  field: T
): (Product[T] extends Array<infer U> ? U : Product[T])[] {
  const values = new Set()
  
  products.forEach(product => {
    const value = product[field]
    if (Array.isArray(value)) {
      value.forEach(v => values.add(v))
    } else if (value !== undefined) {
      values.add(value)
    }
  })
  
  return Array.from(values) as any
}

/**
 * Calculate filter counts
 */
export function calculateFilterCounts(
  products: Product[],
  filteredProducts: Product[]
): FilterWithCounts {
  const categories = new Map<string, number>()
  const colors = new Map<string, number>()
  const sizes = new Map<string, number>()        // FIXED: Added sizes map
  const ratings = new Map<number, number>()

  products.forEach(product => {
    // Category counts
    categories.set(product.category, (categories.get(product.category) || 0) + 1)

    // Color counts
    if (product.colors) {
      product.colors.forEach(color => {
        colors.set(color, (colors.get(color) || 0) + 1)
      })
    }

    // Size counts - FIXED: Added size counting
    if (product.sizes) {
      product.sizes.forEach(size => {
        sizes.set(size, (sizes.get(size) || 0) + 1)
      })
    }

    // Rating counts
    const rating = Math.floor(product.rating)
    ratings.set(rating, (ratings.get(rating) || 0) + 1)
  })

  return {
    categories: Array.from(categories.entries()).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
      count
    })),
    colors: Array.from(colors.entries()).map(([value, count]) => ({
      value,
      label: value,
      count
    })),
    sizes: Array.from(sizes.entries()).map(([value, count]) => ({  // FIXED: Added sizes mapping
      value,
      label: value,
      count
    })),
    priceRanges: [
      { min: 0, max: 100, label: 'Under $100', count: 0 },
      { min: 100, max: 300, label: '$100 - $300', count: 0 },
      { min: 300, max: 500, label: '$300 - $500', count: 0 },
      { min: 500, max: 1000, label: '$500 - $1000', count: 0 },
      { min: 1000, max: Infinity, label: '$1000+', count: 0 }
    ].map(range => ({
      ...range,
      count: filteredProducts.filter(p => p.price >= range.min && p.price <= range.max).length
    })),
    ratings: Array.from(ratings.entries()).map(([value, count]) => ({
      value,
      label: `${value} Stars & Up`,
      count
    }))
  }
}

// ========== CONSTANTS ==========

/**
 * Product categories
 */
export const CATEGORIES = [
  { id: 'precious', name: 'Precious Gems', icon: '💎' },
  { id: 'semi-precious', name: 'Semi-Precious', icon: '✨' },
  { id: 'crystals', name: 'Crystals', icon: '🔮' },
  { id: 'rare', name: 'Rare Collectibles', icon: '👑' },
  { id: 'jewelry', name: 'Finished Jewelry', icon: '💍' }
]

/**
 * Product statuses
 */
export const PRODUCT_STATUSES = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'draft', label: 'Draft', color: 'yellow' },
  { value: 'archived', label: 'Archived', color: 'gray' }
]

/**
 * Product clarities (for gems)
 */
export const CLARITIES = [
  'FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'
]

/**
 * Product cuts (for gems)
 */
export const CUTS = [
  'Round', 'Oval', 'Cushion', 'Emerald', 'Princess', 'Marquise', 'Pear', 'Heart'
]

/**
 * Product origins
 */
export const ORIGINS = [
  'Myanmar', 'Sri Lanka', 'Colombia', 'Brazil', 'South Africa',
  'Australia', 'Russia', 'Canada', 'India', 'Thailand'
]

/**
 * Product sizes
 */
export const SIZES = [  // FIXED: Added sizes constant
  'Small', 'Medium', 'Large', 'Extra Large'
]

// ========== EXPORT ALL ==========

export default {
  // Functions
  generateProductSlug,
  calculateDiscount,
  isOnSale,
  isLowStock,
  formatPriceRange,
  filterProducts,
  sortProducts,
  getUniqueValues,
  calculateFilterCounts,
  
  // Constants
  CATEGORIES,
  PRODUCT_STATUSES,
  CLARITIES,
  CUTS,
  ORIGINS,
  SIZES,           // FIXED: Added SIZES to export
  SORT_OPTIONS
}