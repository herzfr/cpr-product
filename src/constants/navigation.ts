import { LayoutGrid, type LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  end?: boolean;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: 'Product',
    href: '/product',
    icon: LayoutGrid,
    end: true,
  },
];
