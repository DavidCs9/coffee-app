export interface Coffee {
  id: string; // UUID for the coffee entry
  shop_name: string; // Name of the coffee shop
  coffee_rating: number; // Rating of the coffee, between 1 and 5
  dessert_rating: number; // Rating of the dessert, between 1 and 5
  picture_url?: string; // URL of the picture (optional)
  location?: string; // Location of the coffee shop (optional)
  created_at: string; // Timestamp when the record was created
  updated_at: string; // Timestamp when the record was last updated
}
