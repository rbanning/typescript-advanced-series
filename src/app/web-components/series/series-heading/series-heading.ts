import { Nullable } from "../../../utils";
import { PREFIX } from "../../web-components.config";
import { SeriesBaseComponent } from "../series-base-component";

import styles from "./series-heading.module.css";

export class SeriesHeading extends SeriesBaseComponent {

  static observedAttributes = SeriesBaseComponent.observedAttributes;

  constructor(key?: Nullable<string | number>) {
    super(key);
  }


  protected customBuild() {
    this.classList.add(styles['series-heading']);

    if (this.config) {
      this.reset();

      const h1 = document.createElement('h1');
      h1.innerHTML = `
        <span class="${styles.ordinal}">#${this.config.ordinalStr}</span>
        <span class="${styles.title}">${this.config.title}</span>
      `;
      this.appendChild(h1);

      const subtitle = document.createElement('div');
      subtitle.classList.add(styles.subtitle);
      subtitle.innerText = this.config.subtitle;
      this.appendChild(subtitle);
    }
  }

  static readonly TAG = `${PREFIX}-series-heading`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesHeading);
    }
  }

}