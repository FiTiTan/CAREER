// Vault (Coffre-Fort) Types

export interface VaultFolder {
  id: string;
  user_id: string;
  name: string;
  parent_id: string | null;
  color: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export interface VaultFile {
  id: string;
  user_id: string;
  folder_id: string | null;
  name: string;
  original_name: string;
  mime_type: string;
  size: number;
  storage_path: string;
  thumbnail_path: string | null;
  metadata: VaultFileMetadata | null;
  tags: string[];
  starred: boolean;
  created_at: string;
  updated_at: string;
}

export interface VaultFileMetadata {
  width?: number;
  height?: number;
  pages?: number;
  duration?: number;
  extracted_text?: string;
}

export type VaultFileType = 
  | 'cv'
  | 'cover_letter'
  | 'diploma'
  | 'certificate'
  | 'portfolio'
  | 'reference'
  | 'contract'
  | 'other';

export interface VaultShare {
  id: string;
  file_id: string;
  shared_by: string;
  share_token: string;
  expires_at: string | null;
  password_hash: string | null;
  download_count: number;
  max_downloads: number | null;
  created_at: string;
}

export interface VaultQuota {
  used_bytes: number;
  max_bytes: number;
  file_count: number;
  max_files: number;
}
