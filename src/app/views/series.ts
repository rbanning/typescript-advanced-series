import { IRouteProps } from "../routing/route.model";

export function SeriesView(_props: IRouteProps) {

  return `
    <h1>The Series</h1>
    <div class="hero">
      <kpc-unsplash-image id="hero" key="purple-yarn"></kpc-unsplash-image>
    </div>
    <p class="intro">
      lorem ipsum
    </p>
    <kpc-series-nav></kpc-series-nav>
  `
};

