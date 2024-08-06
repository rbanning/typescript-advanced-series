import { seriesRepository } from "../series";
import { advisorRepo } from "../series/advisor.repo";
import { AboutView, AdvisorView, ContactView, HomeView, SeriesItemView, SeriesView } from "../views";
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
  ...seriesRepository.list().map(c => {
    return {
      path: c.href.startsWith('.') ? c.href.substring(1) : c.href,  //convert to path
      handler: SeriesItemView(c)
    }
  }),
  ...advisorRepo.map(c => {
    return {
      path: c.href.startsWith('.') ? c.href.substring(1) : c.href,  //convert to path
      handler: AdvisorView(c)
    }
  }),
] as const;
