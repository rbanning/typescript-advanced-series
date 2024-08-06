import { ButtonSolid } from "./button/button-solid";
import { CodeBlock } from "./code-block/code-block";
import { CopyIcon } from "./copy-icon/copy-icon";
import { ProblemSet } from "./problem-set/problem-set";
import { IdBadge } from "./problem-set/web/id-badge";
import { SeriesFooter } from "./series/series-footer/series-footer";
import { SeriesHeading } from "./series/series-heading/series-heading";
import { SeriesIntro } from "./series/series-intro/series-intro";
import { SeriesItem } from "./series/series-item";
import { SeriesNav } from "./series/series-nav/series-nav";
import { SeriesObjectives } from "./series/series-objectives/series-objectives";
import { TabLabel } from "./tabs/tab-label";
import { TabView } from "./tabs/tab-view";
import { TabsHorizontal } from "./tabs/tabs-horizontal";
import { Test } from "./test/test.web-component";
import { UnsplashImage } from "./unsplash-image/unsplash-image";
import { WebComponentClass } from "./web-components.config";

const webComponents: WebComponentClass[] = [
  Test,
  ButtonSolid,
  UnsplashImage,
  CopyIcon,
  CodeBlock,

  TabLabel,
  TabView,
  TabsHorizontal,

  SeriesItem,
  SeriesHeading,
  SeriesIntro,
  SeriesNav,  
  SeriesFooter,
  SeriesObjectives,

  ProblemSet,

  //problem set specific components
  IdBadge,
]

export function defineOurWebComponents() {
  webComponents.forEach(c => c.define());
}