import { AboutView, ContactView, HomeView, SeriesView } from "../views";
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
  {
    path: '/series',
    handler: SeriesView
  },
] as const;