// Affiliate Types

export type ExperienceLevel = 'professional' | 'hobby' | 'beginner'
export type AudienceSize = 'small' | 'medium' | 'large'
export type PromotionChannel =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube'
  | 'blog'
  | 'email'
  | 'telegram'
  | 'other'
export type ProductInterest = 'testoup' | 'bundles' | 'all'

export interface QuizAnswers {
  experience: ExperienceLevel
  channels: PromotionChannel[]
  audienceSize: AudienceSize
  products: ProductInterest[]
  motivation: string
}

export interface AffiliateApplication {
  id: string
  full_name: string
  email: string
  phone: string | null
  quiz_data: QuizAnswers
  experience_level: ExperienceLevel
  promotion_channels: PromotionChannel[]
  audience_size: AudienceSize
  interested_products: ProductInterest[]
  motivation: string
  status: 'pending' | 'approved' | 'rejected'
  rejection_reason?: string
  admin_notes?: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
  updated_at: string
}

export interface Affiliate {
  id: string
  user_id: string
  application_id?: string
  full_name: string
  email: string
  phone?: string
  promo_code: string
  shopify_discount_id?: string
  commission_rate: number
  commission_type: 'percentage' | 'fixed'
  status: 'active' | 'paused' | 'suspended'
  total_clicks: number
  total_orders: number
  total_revenue: number
  total_commission: number
  payment_method?: string
  payment_details?: Record<string, any>
  preferred_products?: ProductInterest[]
  created_at: string
  updated_at: string
  last_login_at?: string
}

export interface AffiliateOrder {
  id: string
  affiliate_id: string
  shopify_order_id: string
  shopify_order_number?: string
  customer_email?: string
  customer_name?: string
  products?: any
  order_total: number
  discount_amount?: number
  commission_amount: number
  currency: string
  order_status: 'pending' | 'completed' | 'refunded' | 'cancelled'
  payment_status?: string
  commission_paid: boolean
  commission_paid_at?: string
  order_date: string
  created_at: string
  updated_at: string
}

export interface AffiliateMaterial {
  id: string
  title: string
  description?: string
  type: 'image' | 'video' | 'text' | 'guide' | 'social_post'
  category?: 'creative' | 'social' | 'guide' | 'qr_code'
  content?: string
  file_url?: string
  thumbnail_url?: string
  product_tags?: string[]
  social_platform?: 'instagram' | 'facebook' | 'tiktok'
  download_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}
