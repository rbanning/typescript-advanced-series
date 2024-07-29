import { IRouteProps } from "../routing/route.model";

export function HomeView(_props: IRouteProps) {

  return `
    <h1>Home</h1>
    <kpc-unsplash-image id="hero" key="oxford-door-front" size="500"></kpc-unsplash-image>
  `
};

