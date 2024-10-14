export interface UrlData {
  id: string;
  longUrl: string;
  shortUrl: string;
  shortId: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export type Method = "create" | "read" | "update" | "delete";
