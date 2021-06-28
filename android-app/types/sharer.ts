

type ShareType = 'article' | 'file' | 'folder'

export interface SharerConfig {
    contentId?: number;
    expiredIn?: number;
    isAllowComment?: boolean;
    password?: string;
    shareType?: ShareType
}

export interface GetSharerParams {
    current: number;
    isAsc?: boolean;
    size?: number;
    sortBy?: string;
}