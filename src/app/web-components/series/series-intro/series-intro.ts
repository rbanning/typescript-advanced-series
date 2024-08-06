import { Nullable } from "../../../utils";
import { PREFIX } from "../../web-components.config";
import { SeriesBaseComponent } from "../series-base-component";

import styles from "./series-intro.module.css";

export class SeriesIntro extends SeriesBaseComponent {

  static observedAttributes = SeriesBaseComponent.observedAttributes;

  constructor(key?: Nullable<string | number>) {
    super(key);
  }

  protected customBuild() {
    this.classList.add(styles['series-intro']);

    if (this.config) {

      const intro = document.createElement('div');
      intro.classList.add(styles.intro);
      intro.innerHTML = this.config.introduction;
      this.appendChild(intro);

    }
  }

  static readonly TAG = `${PREFIX}-series-intro`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesIntro);
    }
  }

}