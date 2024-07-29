import { IRouteProps } from "../routing/route.model";

export function ContactView(_props: IRouteProps) {

  return `
    <h1>Contact</h1>
    <ui-test></ui-test>
    <kpc-unsplash-image id="hero" key="student-reading-book" size="500"></kpc-unsplash-image>
  `;
}