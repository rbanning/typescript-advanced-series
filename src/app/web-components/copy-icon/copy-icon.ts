import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from "./copy-icon.module.css";

const modes = ["default", "light", "dark"] as const;
type Mode = typeof modes[number];

export class CopyIcon extends BaseWebComponent {
  private mode: Mode = "default";

  static observedAttributes = ["mode"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "mode":
        if (modes.includes(newValue as Mode)) {
          this.mode = newValue as Mode;
        }
        requireRefresh = requireRefresh && (newValue !== oldValue);
        break;
      default: 
        console.warn(`${CopyIcon.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    this.reset();

    this.classList.add(styles['copy-icon']);
    this.classList.add(styles[this.mode]);

    const span1 = this.createElement('span', styles['first']);  
    this.appendChild(span1);
    const span2 = this.createElement('span', styles['second']);  
    this.appendChild(span2);  
  }

  static readonly TAG = `${PREFIX}-copy-icon`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, CopyIcon);
    }
  }

}