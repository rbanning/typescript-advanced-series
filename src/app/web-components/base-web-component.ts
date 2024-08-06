type BasicListener = {
  target: Element;
  type: string;
  listener: EventListenerOrEventListenerObject;
}
export abstract class BaseWebComponent extends HTMLElement {
  protected listeners: BasicListener[] = [];

  constructor() {
    super();    
  }

  connectedCallback() {
    this.buildComponent();
  }

  disconnectedCallback() {
    //clean up any listeners
    this.listeners.forEach(x => x.target.removeEventListener(x.type, x.listener));
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

  protected registerEvent(target: Element, type: string, listener: EventListenerOrEventListenerObject) {
    this.listeners.push({ target, type, listener });
    target.addEventListener(type, listener);
  }

}