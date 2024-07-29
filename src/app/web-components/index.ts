import { Test } from "./test/test.web-component";
import { UnsplashImage } from "./unsplash-image/unsplash-image";
import { WebComponentClass } from "./web-components.config";

const webComponents: WebComponentClass[] = [
  Test,
  UnsplashImage,
]

export function defineOurWebComponents() {
  webComponents.forEach(c => c.define());
}