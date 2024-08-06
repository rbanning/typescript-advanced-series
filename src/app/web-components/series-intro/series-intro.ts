import { seriesRepository } from "../../series";
import { ISeriesConfigExtended } from "../../series/series.types";
import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from "./series-intro.module.css";

export class SeriesIntro extends BaseWebComponent {
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
        console.warn(`${SeriesIntro.TAG} - unsupported attribute: ${name}`);
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
      wrapper.classList.add(styles['series-intro']);
      this.appendChild(wrapper);

      const intro = document.createElement('div');
      intro.classList.add(styles.intro);
      intro.innerHTML = this.config.introduction;
      wrapper.appendChild(intro);
    }
  }

  static readonly TAG = `${PREFIX}-series-intro`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesIntro);
    }
  }

}