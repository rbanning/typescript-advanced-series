import { attach, waitForElementToLoad } from "../components";
import { IRouteProps } from "../routing/route.model";

export function AboutView(_props: IRouteProps) {
  waitForElementToLoad('#hero')
  .then((target) => {
    attach.UnsplashImage(target, 'oxford-bicycles-parked', 500)
  })
  .catch((reason) => {
    console.warn("Unable to load Unsplash Image", {reason});
  });

return `
    <h1>About</h1>
    <div id="hero"></div>
  `;
}