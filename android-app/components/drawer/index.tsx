import React from 'react';
import SideMenu from 'react-native-side-menu-updated';
import { useAuth } from '../../context/auth-context';
import { Menu } from './menu';

export const Drawer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isOpen, setOpen } = useAuth()

  return (
     <SideMenu disableGestures={true} menu={<Menu />} isOpen={isOpen} onChange={() => setOpen(!isOpen)}>
      {children}
    </SideMenu> 
  );
};
