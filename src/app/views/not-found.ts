import { IRouteProps } from "../routing/route.model";

export function NotFoundView(_props: IRouteProps) {
  return `
    <h2 style="color: red;">404</h2>
    <p>The view you requested (<code>${_props.path}</code>) cannot be found!
  `
}