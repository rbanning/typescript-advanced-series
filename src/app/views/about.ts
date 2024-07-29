import { IRouteProps } from "../routing/route.model";

export function AboutView(_props: IRouteProps) {

return `
    <h1>About</h1>
    <kpc-unsplash-image id="hero" key="oxford-bicycles-parked" size="500"></kpc-unsplash-image>
  `;
}