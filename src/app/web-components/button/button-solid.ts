import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from './button-solid.module.css';

export class ButtonSolid extends BaseWebComponent {
  protected originalChildren: Nullable<Node[]>;

  constructor() {
    super();
  }

  protected buildComponent(): void {
    if (!this.originalChildren) {
      this.originalChildren = this.cloneChildren();
      this.reset();
    }

    const btn = this.createElement('button', styles['button-solid']);
    this.appendNodes(btn, this.originalChildren);
    this.appendChild(btn);
  }

  static readonly TAG = `${PREFIX}-button-solid`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, ButtonSolid);
    }
  }

}