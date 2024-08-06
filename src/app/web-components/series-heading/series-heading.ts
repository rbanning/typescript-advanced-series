import { seriesRepository } from "../../series";
import { ISeriesConfigExtended } from "../../series/series.types";
import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from "./series-heading.module.css";

export class SeriesHeading extends BaseWebComponent {
  private config: Nullable<ISeriesConfigExtended>;

  static observedAttributes = ["key"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "key":
        const config = seriesRepository.find(m => m.id === newValue);
        if (config) {
          this.config = config;
          requireRefresh = requireRefresh && (newValue !== oldValue);
        } else {
          requireRefresh = false;
        }
        break;
      default: 
        console.warn(`${SeriesHeading.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    if (this.config) {
      this.reset();

      const wrapper = document.createElement('div');  
      wrapper.classList.add(styles['series-heading']);
      this.appendChild(wrapper);

      const h1 = document.createElement('h1');
      h1.innerHTML = `
        <span class="${styles.ordinal}">#${this.config.ordinalStr}</span>
        <span class="${styles.title}">${this.config.title}</span>
      `;
      wrapper.appendChild(h1);

      const subtitle = document.createElement('div');
      subtitle.classList.add(styles.subtitle);
      subtitle.innerText = this.config.subtitle;
      wrapper.appendChild(subtitle);
    }
  }

  static readonly TAG = `${PREFIX}-series-heading`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesHeading);
    }
  }

}