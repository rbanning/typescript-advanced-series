import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from './'

export class TabLabel extends BaseWebComponent {
  private target: Nullable<string>;
  private active: Nullable<boolean>;

  static observedAttributes = ["label-for", "active"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "label-for":
        this.target = newValue;
        requireRefresh = newValue !== oldValue;
        break;
      case "active":
        this.active = newValue === 'true';
        requireRefresh = newValue !== oldValue;
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
    if (this.target) {
      this.reset();

      this.classList.add(styles['tab-label']);
    }
  }


  static readonly TAG = `${PREFIX}-tab-label`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, TabLabel);
    }
  }

}