export interface PaginationCursor {
  cursor?: string;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormField {
  field: string;
  label: string;
  type: 'number' | 'text' | 'dropdown' | 'date' | 'textarea';
  unit?: string;
  normalRange?: string;
  required: boolean;
  options?: string[];
}

export interface DashboardWidget {
  type: string;
  position: number;
  size: 'small' | 'medium' | 'large';
  refreshInterval?: number; // seconds
}
