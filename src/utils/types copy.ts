export interface FileItem {
  _id: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  tags: string[];
  viewCount: number;
  uploadedBy: string;
  sharedLink: string | null;
  createdAt: string;
  updatedAt: string;
}