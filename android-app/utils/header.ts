import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";
import { Header } from "../components/header";


export function getHeaderTitle(route: Partial<Route<string, object>>, setOpen: ({ isOpen: boolean }) => void) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  switch (routeName) {
    case 'Home':
      return () => Header({ setOpen });
    case 'List':
      return 'list';
  }
}