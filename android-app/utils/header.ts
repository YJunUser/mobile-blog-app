import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";
import { Header } from "../components/header";


// 根据不同的路由导入不同的header
export function getHeaderTitle(route: Partial<Route<string, object>>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  switch (routeName) {
    case 'Home':
      return Header;
    case 'List':
      return 'list';
  }
}