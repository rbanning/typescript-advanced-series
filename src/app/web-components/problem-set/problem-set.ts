import { seriesConfigList } from "../../series";
import { IProblemSet, ISeriesConfigExtended } from "../../series/series.types";
import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from "./problem-set.module.css";


export class ProblemSet extends BaseWebComponent {
  private config: Nullable<ISeriesConfigExtended>;
  private key: Nullable<string | number>;

  private get problemSet(): Nullable<IProblemSet> {
    if (this.config?.problems && this.key) {
      return typeof(this.key) === 'number' ? this.config.problems[this.key] : this.config.problems.find(p => p.id === this.key);
    }
    //else
    return null;
  }

  static observedAttributes = ["series", "key"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "series":        
        const config = seriesConfigList.find(m => m.id === newValue);
        if (config) {
          this.config = config;
          requireRefresh = requireRefresh && (newValue !== oldValue);
        } else {
          requireRefresh = false;
        }        
      break;
      case "key": 
        this.key = parseInt(newValue ?? '');
        if (isNaN(this.key)) {
          this.key = newValue;
        }
        requireRefresh = requireRefresh && (newValue !== oldValue);
        break;
      default: 
        console.warn(`${ProblemSet.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    this.reset();

    const problemSet = this.problemSet;
    if (this.config && problemSet) {
      
      this.classList.add(styles['problem-set']);
  
      const problemEl = this.createElement('div', styles['problem']);  
      problemEl.innerHTML = problemSet.problem(this.config);
      this.appendChild(problemEl);

      if (problemSet.hints.length > 0) {
        const hintsEl = this.createElement('div', styles['hints'])
        hintsEl.innerHTML = `
          <div class="${styles['hint']}">
          ${problemSet.hints
              .map(h => h(this.config as ISeriesConfigExtended))
              .join(`</div> <div class="${styles['hint']}">`)
          }
          </div>
        `
        this.appendChild(hintsEl);
      }

      const solutionEl = this.createElement('div', styles['solution']);  
      solutionEl.innerHTML = problemSet.solution(this.config);
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