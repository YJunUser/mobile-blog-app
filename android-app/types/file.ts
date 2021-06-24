
// 请求参数
type FileStatus = 'recycled' | 'unRecycled'
export interface fileParams {
 fileStatus: FileStatus,
 folderId?: number // 不传显示根目录
}

// 响应数据
type FileType = 'doc' | 'excel' | 'execute' | 'md' | 'pdf' | 'ppt' | 'sound' | 'txt' | 'unknown' | 'zip'
export interface fileData {
  id: number;
  isDirectory: boolean;
  name: string;
  parentFolderId: number;
  size: number;
  sizeUnit: string; 
  type: FileType
}