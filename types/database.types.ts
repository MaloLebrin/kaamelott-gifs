export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      characters: {
        Row: {
          actor: string | null
          createdAt: string
          description: string | null
          episodeCodes: string | null
          history: string | null
          id: number
          imgUrl: string | null
          isMainCharacter: boolean
          name: string
          slug: string
          updatedAt: string | null
        }
        Insert: {
          actor?: string | null
          createdAt?: string
          description?: string | null
          episodeCodes?: string | null
          history?: string | null
          id?: number
          imgUrl?: string | null
          isMainCharacter?: boolean
          name: string
          slug: string
          updatedAt?: string | null
        }
        Update: {
          actor?: string | null
          createdAt?: string
          description?: string | null
          episodeCodes?: string | null
          history?: string | null
          id?: number
          imgUrl?: string | null
          isMainCharacter?: boolean
          name?: string
          slug?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          characterId: number | null
          content: string
          createdAt: string
          episodeCode: string | null
          gifId: number | null
          id: number
          seasonId: number | null
          status: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          characterId?: number | null
          content: string
          createdAt?: string
          episodeCode?: string | null
          gifId?: number | null
          id?: number
          seasonId?: number | null
          status?: string | null
          updatedAt?: string
          userId: string
        }
        Update: {
          characterId?: number | null
          content?: string
          createdAt?: string
          episodeCode?: string | null
          gifId?: number | null
          id?: number
          seasonId?: number | null
          status?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_characterId_fkey"
            columns: ["characterId"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_episodeCode_fkey"
            columns: ["episodeCode"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "comments_gifId_fkey"
            columns: ["gifId"]
            isOneToOne: false
            referencedRelation: "gifs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_seasonId_fkey"
            columns: ["seasonId"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      episodes: {
        Row: {
          characters: string | null
          code: string
          createdAt: string | null
          imgUrl: string | null
          resume: string | null
          slug: string | null
          title: string | null
        }
        Insert: {
          characters?: string | null
          code: string
          createdAt?: string | null
          imgUrl?: string | null
          resume?: string | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          characters?: string | null
          code?: string
          createdAt?: string | null
          imgUrl?: string | null
          resume?: string | null
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
      gifs: {
        Row: {
          characters: string | null
          characters_speaking: string | null
          created_at: string
          episode: string | null
          filename: string
          id: number
          quote: string | null
          slug: string
          url: string
          userId: string | null
        }
        Insert: {
          characters?: string | null
          characters_speaking?: string | null
          created_at?: string
          episode?: string | null
          filename: string
          id?: number
          quote?: string | null
          slug: string
          url: string
          userId?: string | null
        }
        Update: {
          characters?: string | null
          characters_speaking?: string | null
          created_at?: string
          episode?: string | null
          filename?: string
          id?: number
          quote?: string | null
          slug?: string
          url?: string
          userId?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          characterId: number | null
          createdAt: string
          episodeCode: string | null
          gifId: number | null
          id: number
          seasonId: number | null
          userId: string | null
        }
        Insert: {
          characterId?: number | null
          createdAt?: string
          episodeCode?: string | null
          gifId?: number | null
          id?: number
          seasonId?: number | null
          userId?: string | null
        }
        Update: {
          characterId?: number | null
          createdAt?: string
          episodeCode?: string | null
          gifId?: number | null
          id?: number
          seasonId?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_characterId_fkey"
            columns: ["characterId"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_episodeCode_fkey"
            columns: ["episodeCode"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "likes_gifId_fkey"
            columns: ["gifId"]
            isOneToOne: false
            referencedRelation: "gifs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_seasonId_fkey"
            columns: ["seasonId"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          createdAt: string
          id: number
          role: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          role?: string
          userId?: string
        }
        Update: {
          createdAt?: string
          id?: number
          role?: string
          userId?: string
        }
        Relationships: []
      }
      seasons: {
        Row: {
          airDate: string | null
          duration: string | null
          episodesCount: number | null
          id: number
          resume: string | null
          slug: string
          title: string | null
          wikipediaLink: string | null
        }
        Insert: {
          airDate?: string | null
          duration?: string | null
          episodesCount?: number | null
          id: number
          resume?: string | null
          slug: string
          title?: string | null
          wikipediaLink?: string | null
        }
        Update: {
          airDate?: string | null
          duration?: string | null
          episodesCount?: number | null
          id?: number
          resume?: string | null
          slug?: string
          title?: string | null
          wikipediaLink?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
