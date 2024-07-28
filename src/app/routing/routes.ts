import { AboutView, ContactView, HomeView } from "../views";
import { IRoute } from "./route.model";

export const routes: IRoute[] = [
  {
    path: '/',
    handler: HomeView
  },
  {
    path: '/about',
    handler: AboutView
  },
  {
    path: '/contact',
    handler: ContactView
  },
] as const;