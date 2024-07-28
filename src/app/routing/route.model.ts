export type RouteHandler = (route: IRouteProps) => string;

export interface IRouteProps {
  path: string;
  data?: unknown;
}

export interface IRoute extends IRouteProps {
  handler: RouteHandler;
}