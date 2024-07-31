import { CodeBlock } from "./code-block/code-block";
import { CopyIcon } from "./copy-icon/copy-icon";
import { SeriesFooter } from "./series-footer/series-footer";
import { SeriesHeading } from "./series-heading/series-heading";
import { SeriesIntro } from "./series-intro/series-intro";
import { SeriesNav } from "./series-nav/series-nav";
import { Test } from "./test/test.web-component";
import { UnsplashImage } from "./unsplash-image/unsplash-image";
import { WebComponentClass } from "./web-components.config";

const webComponents: WebComponentClass[] = [
  Test,
  UnsplashImage,
  CopyIcon,
  CodeBlock,

  SeriesHeading,
  SeriesIntro,
  SeriesNav,  
  SeriesFooter,

]

export function defineOurWebComponents() {
  webComponents.forEach(c => c.define());
}