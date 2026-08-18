export interface HealthResponse {
  status: string;
  message: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  createdAt: number;
}

export interface AddItemRequest {
  title: string;
}
