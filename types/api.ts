// API Types

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface UploadResponse {
  success: true;
  data: {
    id: string;
    path: string;
    url: string;
    size: number;
    mime_type: string;
  };
}

export interface AnalysisStatusResponse {
  success: true;
  data: {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number; // 0-100
    current_step: string | null;
    result_id: string | null;
    error: string | null;
  };
}
