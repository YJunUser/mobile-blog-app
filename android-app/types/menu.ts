export interface MenuProps {
  title: string;
  icon: string;
  iconType: string;
  iconColor?: string;
  size?: number;
  handler?: () => void;
}