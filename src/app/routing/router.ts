import { fadeIn, fadeOut } from "../utils";
import { NotFoundView } from "../views";
import { routes } from "./routes";

const DELAY = 200; //ms - transition between views
const BASE_PATH = "/typescript-advanced-series";

function parsePathname(path: string) {
  //hack: need to remove the site "folder" from path.
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

function resetActivatedAnchorTags(href?: string) {
  href ??= window.location.href;
  Array.from(document.querySelectorAll('a'))
    .forEach(link => {
      link.classList.toggle('active', link.href === href);
    })
}

export function activateRouter(initialPath?: string) {
  window.addEventListener('popstate', (_) => {
    //back in browser history
    loadView();
    resetActivatedAnchorTags();
  });

  document.addEventListener('DOMContentLoaded', (_) => {
    //load the initial view based on url (or as determined by the activatedRouter param)
    loadView(initialPath);
    resetActivatedAnchorTags();
  })
  
  document.body.addEventListener('click', (e) => {
    const target = findAnchorElement(e.target as HTMLElement);
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      loadView(target.pathname);      
      resetActivatedAnchorTags(target.href);
      history.pushState({}, "routing", target.href);

      return false;
    }
    //else ignore
  });
}