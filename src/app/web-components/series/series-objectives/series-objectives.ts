import { Nullable } from "../../../utils";
import { PREFIX } from "../../web-components.config";
import { SeriesBaseComponent } from "../series-base-component";

import styles from "./series-objectives.module.css";

export class SeriesObjectives extends SeriesBaseComponent {

  static observedAttributes = SeriesBaseComponent.observedAttributes;

  constructor(key?: Nullable<string | number>) {
    super(key);
  }


  protected customBuild() {
    if (this.config) {

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