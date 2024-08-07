import { IRouteProps } from "../routing/route.model";
import { seriesRepository } from "../series";
import { ISeriesConfigExtended } from "../series/series.types";
import { NotFoundView } from "./not-found";

export function SeriesItemView(arg: string | ISeriesConfigExtended) {
  
  const config = typeof(arg) === 'string' ? seriesRepository.find(m => m.href === arg) : arg;
  
  return (_props: IRouteProps) => {
    if (config) {
      return `      
        <kpc-series-item key="${config.id}"></kpc-series-item>

        <div class="my-xl">
          <kpc-series-footer key="${config.id}"></kpc-series-footer>
        </div>
      `;
    }

    //else
    return NotFoundView(_props);
  }

}