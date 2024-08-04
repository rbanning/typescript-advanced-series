import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from './tab-view.module.css';

export class TabView extends BaseWebComponent {
  active: Nullable<boolean>;

  static observedAttributes = ["active"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, _oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "active":
        this.active = newValue === 'true';
        this.updateComponent();
        break;
      default: 
        console.warn(`${TabView.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    this.classList.add(styles['tab-view']);
    this.updateComponent();
  }

  updateComponent() {
    this.classList.toggle(styles['active'], this.active === true);
  }


  static readonly TAG = `${PREFIX}-tab-view`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, TabView);
    }
  }

}