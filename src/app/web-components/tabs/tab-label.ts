import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from './tab-label.module.css';

export type TabLabelClickEvent = {
  target: Nullable<string>,
  active: Nullable<boolean>,
  element: TabLabel,
};

export class TabLabel extends BaseWebComponent {
  target: Nullable<string>;   //as indicated by the `label-for` attribute
  active: Nullable<boolean>;
  protected originalChildNodes: Nullable<Node[]>;
  protected componentHasBeenBuilt = false;

  static observedAttributes = ["label-for", "active"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, _oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "label-for":
        this.target = newValue;
        this.updateComponent();
        break;
      case "active":
        this.active = newValue === 'true';
        this.updateComponent();
        break;
      default: 
        console.warn(`${TabLabel.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    if (!this.componentHasBeenBuilt) {
      this.componentHasBeenBuilt = true;
      this.originalChildNodes = this.cloneChildren();
    }

    this.reset();

    this.classList.add(styles['tab-label']);
    const btn = this.createElement('btn');
    this.appendChild(btn);
    this.appendNodes(btn, this.originalChildNodes ?? []);
    this.registerEvent(btn, 'click', () => this.handleClick()); //watch for clicks

    this.updateComponent(btn);
  }

  updateComponent(btn?: Nullable<Element>) {
    //only if component has been built
    if (this.componentHasBeenBuilt) {
      this.classList.toggle(styles['active'], this.active === true);
      btn ??= this.querySelector('btn');
      if (btn) {
        (btn as HTMLButtonElement).disabled = !this.target;
      }
    }
  }

  

  protected handleClick() {
    this.dispatchEvent(
      new CustomEvent<TabLabelClickEvent>(TabLabel.clickEventKey, {
        bubbles: true,
        cancelable: true,
        detail: {
          active: this.active,
          target: this.target,
          element: this
        }
      })
    )
  }

  static readonly TAG = `${PREFIX}-tab-label`;
  static readonly clickEventKey = `${this.TAG}-click`

  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, TabLabel);
    }
  }

}