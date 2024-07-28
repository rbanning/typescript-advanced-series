import { NotFoundView } from "../views";
import { routes } from "./routes";

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

function loadView(path?: string | null) {
  const root = document.getElementById('root');
  if (root) {
    path ??= window.location.pathname;
    const view = routes.find(r => r.path === path);
    root.innerHTML = view ? view.handler(view) : NotFoundView({path});
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
      loadView(target.pathname)
      return false;
    }
    //else ignore
  });
}