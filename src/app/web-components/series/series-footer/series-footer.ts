import { seriesRepository } from "../../../series";
import { ISeriesConfigExtended } from "../../../series/series.types";
import { Nullable } from "../../../utils";
import { BaseWebComponent } from "../../base-web-component";
import { PREFIX } from "../../web-components.config";

import styles from "./series-footer.module.css";

export class SeriesFooter extends BaseWebComponent {
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
        console.warn(`${SeriesFooter.TAG} - unsupported attribute: ${name}`);
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
      wrapper.classList.add(styles['series-footer']);
      this.appendChild(wrapper);

      const h3 = document.createElement('h3');
      h3.innerHTML = `The Series...`;
      wrapper.appendChild(h3);

      const nav = document.createElement('div');
      nav.innerHTML = `<${PREFIX}-series-nav current="${this.config.id}"></${PREFIX}-series-nav>`;
      wrapper.appendChild(nav);
    }
  }

  static readonly TAG = `${PREFIX}-series-footer`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesFooter);
    }
  }

}