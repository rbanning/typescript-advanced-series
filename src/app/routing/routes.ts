import { seriesConfigList } from "../series";
import { AboutView, ContactView, HomeView, SeriesItemView, SeriesView } from "../views";
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
  ...seriesConfigList.map(c => {
    return {
      path: c.href.startsWith('.') ? c.href.substring(1) : c.href,  //convert to path
      handler: SeriesItemView(c)
    }
  })
] as const;
