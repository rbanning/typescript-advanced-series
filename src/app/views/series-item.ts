import { IRouteProps } from "../routing/route.model";
import { seriesConfigList } from "../series";
import { ISeriesConfigExtended } from "../series/series.types";
import { NotFoundView } from "./not-found";

export function SeriesItemView(arg: string | ISeriesConfigExtended) {
  
  const config = typeof(arg) === 'string' ? seriesConfigList.find(m => m.href = arg) : arg;
  
  return (_props: IRouteProps) => {
    if (config) {
      return `
        <kpc-series-heading key="${config.id}"></kpc-series-heading>
        <div class="hero">
          <kpc-unsplash-image key="${config.id}" cover="top"></kpc-unsplash-image>
        </div>
        <kpc-series-intro key="${config.id}"></kpc-series-intro>

        <h2 style="margin-top: 2rem; text-align: center;">Objectives</h2>
        <kpc-series-objectives key="${config.id}"></kpc-series-objectives>

        ${config.problems?.map((_, index) => (`
          <div style="margin: 3rem 0;">
            <kpc-problem-set series="${config.id}" key="${index}"></kpc-problem-set>
          </div>
        `))}

        <kpc-series-footer key="${config.id}"></kpc-series-footer>
      `;
    }

    //else
    return NotFoundView(_props);
  }

}