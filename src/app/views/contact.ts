import { attach, waitForElementToLoad } from "../components";
import { IRouteProps } from "../routing/route.model";

export function ContactView(_props: IRouteProps) {
  waitForElementToLoad('#hero')
  .then((target) => {
    attach.UnsplashImage(target, 'student-reading-book', 500)
  })
  .catch((reason) => {
    console.warn("Unable to load Unsplash Image", {reason});
  });


  return `
    <h1>Contact</h1>
    <div id="hero"></div>
  `;
}