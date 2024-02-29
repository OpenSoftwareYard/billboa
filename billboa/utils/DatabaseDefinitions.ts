export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          address: string;
          city: string;
          company_id: number;
          company_number: string;
          country: string;
          created_at: string;
          id: number;
          name: string;
          state: string;
          updated_at: string;
          vat_number: string;
        };
        Insert: {
          address: string;
          city: string;
          company_id: number;
          company_number: string;
          country: string;
          created_at?: string;
          id?: never;
          name: string;
          state: string;
          updated_at?: string;
          vat_number: string;
        };
        Update: {
          address?: string;
          city?: string;
          company_id?: number;
          company_number?: string;
          country?: string;
          created_at?: string;
          id?: never;
          name?: string;
          state?: string;
          updated_at?: string;
          vat_number?: string;
        };
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
        ];
      };
      companies: {
        Row: {
          address: string;
          city: string;
          company_number: string;
          country: string;
          created_at: string;
          id: number;
          name: string;
          state: string;
          updated_at: string;
          vat_number: string;
        };
        Insert: {
          address: string;
          city: string;
          company_number: string;
          country: string;
          created_at?: string;
          id?: number;
          name: string;
          state: string;
          updated_at?: string;
          vat_number: string;
        };
        Update: {
          address?: string;
          city?: string;
          company_number?: string;
          country?: string;
          created_at?: string;
          id?: number;
          name?: string;
          state?: string;
          updated_at?: string;
          vat_number?: string;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          client_id: number;
          company_id: number;
          created_at: string;
          currency: string;
          date: string;
          due_date: string;
          exchange_rate: number;
          id: number;
          invoice_number: string;
          status: string;
          total_amount: number;
          updated_at: string;
        };
        Insert: {
          client_id: number;
          company_id: number;
          created_at?: string;
          currency: string;
          date: string;
          due_date: string;
          exchange_rate?: number;
          id?: never;
          invoice_number: string;
          status: string;
          total_amount: number;
          updated_at?: string;
        };
        Update: {
          client_id?: number;
          company_id?: number;
          created_at?: string;
          currency?: string;
          date?: string;
          due_date?: string;
          exchange_rate?: number;
          id?: never;
          invoice_number?: string;
          status?: string;
          total_amount?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices_products: {
        Row: {
          created_at: string;
          invoice_id: number;
          product_id: number;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          invoice_id: number;
          product_id: number;
          quantity: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          invoice_id?: number;
          product_id?: number;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_products_invoice_id_fkey";
            columns: ["invoice_id"];
            isOneToOne: false;
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_products_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          company_id: number;
          created_at: string;
          currency: string;
          description: string;
          id: number;
          name: string;
          price: number;
          updated_at: string;
        };
        Insert: {
          company_id: number;
          created_at?: string;
          currency: string;
          description: string;
          id?: never;
          name: string;
          price: number;
          updated_at?: string;
        };
        Update: {
          company_id?: number;
          created_at?: string;
          currency?: string;
          description?: string;
          id?: never;
          name?: string;
          price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
