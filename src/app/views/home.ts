import { attach, waitForElementToLoad } from "../components";
import { IRouteProps } from "../routing/route.model";

export function HomeView(_props: IRouteProps) {
  waitForElementToLoad('#hero')
    .then((target) => {
      attach.UnsplashImage(target, 'oxford-door-front', 500)
    })
    .catch((reason) => {
      console.warn("Unable to load Unsplash Image", {reason});
    });

  return `
    <h1>Home</h1>
    <div id="hero"></div>
  `
};

