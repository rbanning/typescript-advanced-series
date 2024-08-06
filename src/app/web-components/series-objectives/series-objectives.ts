import { seriesRepository } from "../../series";
import { ISeriesConfigExtended } from "../../series/series.types";
import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from "./series-objectives.module.css";

export class SeriesObjectives extends BaseWebComponent {
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
        console.warn(`${SeriesObjectives.TAG} - unsupported attribute: ${name}`);
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

      this.classList.add(styles['series-objectives']);

      
      if ((this.config.objectives ?? []).length === 0) {
        const error = this.createElement('div', 'text-error', 'text-center');
        error.innerText = "No objectives have been defined.";
        this.appendChild(error);
      } else {
        const wrapper = document.createElement('ul');  
        this.appendChild(wrapper);
        (this.config.objectives ?? []).forEach(o => {
          const li = this.createElement('li');
          li.innerHTML = `
            <span class="${styles['title']}">${o.title}</span>
            <span class="${styles['description']}">${o.description}</span>
          `;
          wrapper.appendChild(li);
        });
      }
    }
  }


  static readonly TAG = `${PREFIX}-series-objectives`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesObjectives);
    }
  }

}