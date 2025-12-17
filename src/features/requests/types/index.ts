export type RequestStatus = "pending" | "approved" | "rejected" | "in_progress";

export interface Request {
  id: string;
  employee: string;
  position: string;
  type: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  startDate: string;
  endDate: string;
  duration: string;
  attachments: number;
  notes?: string;
}

export interface RequestMetrics {
  pending: number;
  approved: number;
  rejected: number;
  inProgress: number;
}
