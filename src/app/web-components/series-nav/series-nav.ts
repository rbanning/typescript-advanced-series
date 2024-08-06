import { seriesRepository } from "../../series";
import { ISeriesConfigExtended } from "../../series/series.types";
import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from "./series-nav.module.css";

export class SeriesNav extends BaseWebComponent {
  private current: Nullable<string>;

  static observedAttributes = ["current"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "current":
        this.current = newValue;
        requireRefresh = requireRefresh && (newValue !== oldValue);
        break;
      default: 
        console.warn(`${SeriesNav.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    const configs: ISeriesConfigExtended[] = [...seriesRepository];
      this.reset();

      const nav = document.createElement('nav');  
      nav.classList.add(styles['series-nav']);
      this.appendChild(nav);

      configs.forEach(config => {
        const a = document.createElement('a');
        a.classList.toggle(styles.current, config.id === this.current);
        nav.appendChild(a);
        a.href = config.href;
        a.innerText = `#${config.ordinalStr} - ${config.title}`
      })      
  }

  static readonly TAG = `${PREFIX}-series-nav`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesNav);
    }
  }

}