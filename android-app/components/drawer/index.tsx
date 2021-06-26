import React from 'react';
import SideMenu from 'react-native-side-menu-updated';
import { useAuth } from '../../context/auth-context';
import { useMount } from '../../utils';
import { Menu } from './menu';

export const Drawer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isOpen, setOpen } = useAuth()

  return (
    <SideMenu disableGestures={false} menu={<Menu />} isOpen={isOpen} autoClosing={true} onChange={() => setOpen(!isOpen)}>
      {children}
    </SideMenu>
  );
};
