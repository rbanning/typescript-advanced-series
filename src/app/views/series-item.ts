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

        <div style="margin: 3rem 0;">
          todo: add content here
        </div>

        <kpc-series-footer key="${config.id}"></kpc-series-footer>
      `;
    }

    //else
    return NotFoundView(_props);
  }

}