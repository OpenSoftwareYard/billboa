export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
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
          id?: never;
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
          id?: never;
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
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices_products: {
        Row: {
          created_at: string;
          id: number;
          invoice_id: number;
          product_id: number;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: never;
          invoice_id: number;
          product_id: number;
          quantity: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: never;
          invoice_id?: number;
          product_id?: number;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_products_invoice_id_fkey";
            columns: ["invoice_id"];
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_products_product_id_fkey";
            columns: ["product_id"];
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
