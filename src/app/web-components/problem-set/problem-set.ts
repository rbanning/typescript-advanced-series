import { ISeriesConfigExtended } from "../../series/series.types";
import { Nullable } from "../../utils";
import { PREFIX } from "../web-components.config";
import { ProblemBaseComponent } from "./problem-base-component";

import styles from "./problem-set.module.css";


export class ProblemSet extends ProblemBaseComponent {


  static observedAttributes = ["series", "key"]

  constructor() {
    super();
  }

  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {

    let { resolved, requiresRefresh } = this.parseAttributeChanges(name, oldValue, newValue);

    if (!resolved) {
      switch (name) {
        //add any other name checks
        default: 
          console.warn(`${ProblemSet.TAG} - unsupported attribute: ${name}`);
          requiresRefresh = false;
          break;
      }
    }

    if (requiresRefresh) {
      this.buildComponent();
    }
  }


  protected customBuild() {
    if (this.config && this.problemSet) {
      
      this.classList.add(styles['problem-set']);
  
      const problemEl = this.createElement('div', styles['problem']);  
      console.log(">>> problem", {problemSet: this.problemSet, problem: this.problemSet.problem(this.config)});
      problemEl.innerHTML = this.problemSet.problem(this.config);
      this.appendChild(problemEl);

      if (this.problemSet.hints.length > 0) {
        const hintsEl = this.createElement('div', styles['hints'])
        hintsEl.innerHTML = `
          <div class="${styles['hint']}">
          ${this.problemSet.hints
              .map(h => h(this.config as ISeriesConfigExtended))
              .join(`</div> <div class="${styles['hint']}">`)
          }
          </div>
        `
        this.appendChild(hintsEl);
      }

      const solutionEl = this.createElement('div', styles['solution']);  
      solutionEl.innerHTML = this.problemSet.solution(this.config);
      this.appendChild(solutionEl);
      
      const span2 = this.createElement('span', styles['second']);  
      this.appendChild(span2);  

    }
  }

  static readonly TAG = `${PREFIX}-problem-set`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, ProblemSet);
    }
  }

}