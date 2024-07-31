
export abstract class BaseWebComponent extends HTMLElement {

  constructor() {
    super();    
  }

  connectedCallback() {
    this.buildComponent();
  }


  protected buildComponent() {
    //add build implementation here
  }


  protected reset() {
    while(this.firstChild) {
      this.firstChild.remove();
    }
  }

  protected createElement(tag: string, ...classNames: string[]) {
    const el = document.createElement(tag);
    (classNames ?? []).forEach(css => el.classList.add(css));
    return el;
  }

  protected cloneChildren() {
    return Array.from(this.childNodes)
      .map(child => child.cloneNode(true));
  }

  protected appendNodes(target: HTMLElement, nodes: Node[]) {
    if (target && nodes?.length > 0) {
      nodes.forEach(n => target.appendChild(n));
    }
  }

}