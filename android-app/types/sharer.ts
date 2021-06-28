

type ShareType = 'article' | 'file' | 'folder'

export interface SharerConfig {
    contentId?: number;
    expiredIn?: number;
    isAllowComment?: boolean;
    password?: string;
    shareType?: ShareType
}