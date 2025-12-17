export type AssetStatus = "available" | "in_use" | "maintenance" | "retired";

export type AssetType =
  | "computer_equipment"
  | "furniture"
  | "vehicle"
  | "tool"
  | "electronic"
  | "other";

export interface Location {
  id: string;
  name: string;
  building?: string;
  floor?: string;
  area?: string;
}

export interface Movement {
  id: string;
  assetId: string;
  type: "assignment" | "return" | "transfer" | "maintenance" | "retirement";
  description: string;
  previousLocation?: string;
  newLocation?: string;
  previousResponsible?: string;
  newResponsible?: string;
  date: string;
  performedBy: string;
  notes?: string;
}

export interface AttachedDocument {
  id: string;
  name: string;
  type: "invoice" | "warranty" | "manual" | "photo" | "other";
  url: string;
  uploadDate: string;
}

export interface Asset {
  id: string;
  code: string;
  name: string;
  description: string;
  type: AssetType;
  status: AssetStatus;
  brand?: string;
  model?: string;
  serialNumber?: string;
  location: Location;
  responsible?: string;
  acquisitionDate: string;
  acquisitionValue?: number;
  supplier?: string;
  warrantyUntil?: string;
  qrCode: string;
  photos: string[];
  documents: AttachedDocument[];
  movementHistory: Movement[];
  createdAt: string;
  updatedAt: string;
}
