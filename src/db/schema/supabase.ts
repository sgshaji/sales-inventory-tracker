export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          sku: string
          name: string
          category: string | null
          purchase_price: number
          sell_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          category?: string | null
          purchase_price: number
          sell_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          category?: string | null
          purchase_price?: number
          sell_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          name: string
          contact: string | null
          lead_time_days: number
        }
        Insert: {
          id?: string
          name: string
          contact?: string | null
          lead_time_days?: number
        }
        Update: {
          id?: string
          name?: string
          contact?: string | null
          lead_time_days?: number
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string | null
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
        }
      }
      inventory_by_location: {
        Row: {
          product_id: string
          location_id: string
          qty_on_hand: number
          updated_at: string
        }
        Insert: {
          product_id: string
          location_id: string
          qty_on_hand?: number
          updated_at?: string
        }
        Update: {
          product_id?: string
          location_id?: string
          qty_on_hand?: number
          updated_at?: string
        }
      }
      sales: {
        Row: {
          id: string
          product_id: string
          location_id: string
          qty_sold: number
          sale_price: number
          sold_by: string | null
          created_at: string
          is_return: boolean
        }
        Insert: {
          id?: string
          product_id: string
          location_id: string
          qty_sold: number
          sale_price: number
          sold_by?: string | null
          created_at?: string
          is_return?: boolean
        }
        Update: {
          id?: string
          product_id?: string
          location_id?: string
          qty_sold?: number
          sale_price?: number
          sold_by?: string | null
          created_at?: string
          is_return?: boolean
        }
      }
      purchase_orders: {
        Row: {
          id: string
          supplier_id: string
          status: string
          eta: string | null
          created_at: string
        }
        Insert: {
          id?: string
          supplier_id: string
          status?: string
          eta?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          supplier_id?: string
          status?: string
          eta?: string | null
          created_at?: string
        }
      }
      po_items: {
        Row: {
          po_id: string
          product_id: string
          qty_ordered: number
          unit_cost: number
        }
        Insert: {
          po_id: string
          product_id: string
          qty_ordered: number
          unit_cost: number
        }
        Update: {
          po_id?: string
          product_id?: string
          qty_ordered?: number
          unit_cost?: number
        }
      }
      price_history: {
        Row: {
          id: string
          product_id: string
          old_price: number
          new_price: number
          changed_at: string
          changed_by: string | null
        }
        Insert: {
          id?: string
          product_id: string
          old_price: number
          new_price: number
          changed_at?: string
          changed_by?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          old_price?: number
          new_price?: number
          changed_at?: string
          changed_by?: string | null
        }
      }
      audit_logs: {
        Row: {
          id: string
          table: string
          row_id: string | null
          action: string
          payload: Json | null
          performed_by: string | null
          ts: string
        }
        Insert: {
          id?: string
          table: string
          row_id?: string | null
          action: string
          payload?: Json | null
          performed_by?: string | null
          ts?: string
        }
        Update: {
          id?: string
          table?: string
          row_id?: string | null
          action?: string
          payload?: Json | null
          performed_by?: string | null
          ts?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 