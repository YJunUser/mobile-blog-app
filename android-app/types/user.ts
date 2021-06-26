
type Role = 'admin' | 'sharer'

export interface UserInfo {
    nickname: string;
    email: string;
    avatar: string;
    role: Role;
}