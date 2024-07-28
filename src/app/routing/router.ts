import { fadeIn, fadeOut } from "../utils";
import { NotFoundView } from "../views";
import { routes } from "./routes";

const DELAY = 200; //ms - transition between views
const BASE_PATH = "/typescript-advanced-series";

function parsePathname(path: string) {
  //hack: need to remove the site "folder" from path.
  console.log(">>> parsePathname path", path);
  return path.startsWith(BASE_PATH) ? path.replace(BASE_PATH, '') : path;
}

function findAnchorElement(target: HTMLElement | null | undefined) {
  if (target) {
    switch (target.tagName.toLocaleLowerCase()) {
      case "a":
        return target as HTMLAnchorElement;
      case "body":
        return null;
      default: 
        //else
        return findAnchorElement(target.parentElement);
    }
  }
  //else (not found)
  return null;
}

async function loadView(path?: string | null) {
  const root = document.getElementById('root');
  if (root) {
    path = parsePathname(path ?? window.location.pathname);
    const view = routes.find(r => r.path === path);
    const html = view ? view.handler(view) : NotFoundView({path});
    await fadeOut(root, DELAY);
    root.innerHTML = html;
    await fadeIn(root, DELAY);
  } else {
    console.error(`Could not load the requested view: unable to find the #root element`);
  }
}

export function activateRouter(initialPath?: string) {
  window.addEventListener('popstate', (e) => {
    e.preventDefault();
    console.log(">>> popstate", e);
    return false;
  });

  document.addEventListener('DOMContentLoaded', (e) => {
    console.log(">>> DOMContentLoaded", {e, state: document.readyState, x: window});
    loadView(initialPath);
  })
  
  document.body.addEventListener('click', (e) => {
    const target = findAnchorElement(e.target as HTMLElement);
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

  console.log(">>> check path", {path: target.pathname, href: target.href});

      loadView(target.pathname)
      return false;
    }
    //else ignore
  });
}