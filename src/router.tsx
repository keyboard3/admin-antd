import Home from "./pages/home";
import Login from "./pages/login";
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
interface Menu { name: string, component?: any, path?: string, icon?: any, subs?: any[] }
export const menuRoutes: Menu[] = [
  {
    name: "Home",
    icon: DesktopOutlined,
    path: "/",
    component: Home
  },
  {
    name: "Login",
    icon: PieChartOutlined,
    subs: [
      {
        name: "页面",
        path: '/login',
        component: Login
      }
    ]
  }
]
export const pageRoutes = menuRoutes.map(item => {
  if (item.path && item.component) return [item];
  return item.subs || [];
}).reduceRight((cur, all) => [...cur, ...all], []) as Menu[];
console.log("pageRoutes", pageRoutes);