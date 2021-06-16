import React from 'react';
import SideMenu from 'react-native-side-menu-updated';
import { Menu } from './menu';

export const Drawer = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  return (
    <SideMenu disableGestures={false} menu={<Menu />} isOpen={isOpen}>
      {children}
    </SideMenu>
  );
};
