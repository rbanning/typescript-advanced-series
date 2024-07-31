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
          <kpc-code-block lang="typescript">
//todo: need to add the series' content including problems 
const a = 54;
const b = "Aliquam dolor arcu, euismod malesuada dui at, iaculis blandit lacus. Curabitur sollicitudin lorem at lectus efficitur, et ultrices metus accumsan. Fusce venenatis rutrum scelerisque. Mauris vehicula quam vel vehicula elementum. Aliquam hendrerit, ex vitae lacinia elementum, neque turpis sodales massa, sit amet ultricies libero dui vitae diam. In molestie fermentum commodo. Etiam vestibulum egestas justo, eget congue dui tincidunt non. Suspendisse et aliquam libero. Quisque pretium metus sit amet tortor luctus malesuada. Etiam nec semper nibh.";
          </kpc-code-block>
        </div>

        <kpc-series-footer key="${config.id}"></kpc-series-footer>
      `;
    }

    //else
    return NotFoundView(_props);
  }

}