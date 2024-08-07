import { isNotNullish, Nullable } from "../../utils";
import { UnsplashImage } from "../unsplash-image/unsplash-image";
import { PREFIX } from "../web-components.config";
import { SeriesBaseComponent } from "./series-base-component";
import { SeriesHeading } from "./series-heading/series-heading";
import { SeriesIntro } from "./series-intro/series-intro";
import { SeriesObjectives } from "./series-objectives/series-objectives";

import styles from './series-item.module.css';
import { ButtonSolid } from "../button/button-solid";
import { IProblemSet, ISeriesConfigExtended } from "../../series/series.types";
import { TabLabel } from "../tabs/tab-label";
import { TabView } from "../tabs/tab-view";
import { TabsHorizontal } from "../tabs/tabs-horizontal";

type SeriesViews = {
  intro: Nullable<HTMLElement>,
  problems: Nullable<HTMLElement>
}

export class SeriesItem extends SeriesBaseComponent {
  protected hero: Nullable<HTMLElement>;
  protected views: SeriesViews = {
    intro: null,
    problems: null
  }


  static observedAttributes = SeriesBaseComponent.observedAttributes;

  constructor(key?: Nullable<string | number>) {
    super(key);
  }

  protected customBuild(): void {
    this.classList.add(styles['series-item']);

    if (this.config) {
      this.appendChild(new SeriesHeading(this.config.id));
  
      this.hero = this.createElement('div', 'hero');
      const heroImage = new UnsplashImage(this.config.id);
      heroImage.setAttribute("cover", "top");
      this.hero.appendChild(heroImage);
      this.appendChild(this.hero);

      const viewContainer = this.createElement('div', styles['view-container']);
      this.appendChild(viewContainer);

      //intro

      this.views.intro = this.createElement('div', styles['view'], styles['active']);
      this.views.intro.appendChild(new SeriesIntro(this.config.id));
      const objectivesHeading = this.createElement('div', 'my-xl');
      objectivesHeading.innerHTML = `
        <h2 class="text-center">Objectives</h2>
        <p class="text-center">Your Expected Learning Outcomes</p>
      `;
      this.views.intro.appendChild(objectivesHeading);
      this.views.intro.appendChild(new SeriesObjectives(this.config.id));
      const introActions = this.createElement('div', 'my-xl', 'actions');
      const btn = new ButtonSolid();
      btn.innerText = "Get Started";
      this.registerEvent(btn, 'click', () => this.getStarted());
      introActions.appendChild(btn);
      this.views.intro.appendChild(introActions);

      viewContainer.appendChild(this.views.intro);

      //problems
      if (this.config.problems && this.config.problems.length > 0) {
        this.views.problems = this.createElement('div', styles['view'], styles['holding']);
        const horizontalTabs = new TabsHorizontal();
        horizontalTabs.setAttribute('format', 'button');
        this.views.problems.appendChild(horizontalTabs);

        this.config.problems.forEach(ps => {          
          this.attachProblemSet(horizontalTabs, ps);
        });
      }      
    }    
  }

  protected logAction(action: string) {
    console.log("Action Triggered", action);
  }

  protected getStarted() {
    console.log(">>> get started");
  }

  protected attachProblemSet(target: HTMLElement, ps: IProblemSet) {
    if (this.config) {

      const tab = new TabLabel();
      tab.target = ps.id;
      tab.innerHTML = ps.title;
      target.appendChild(tab);
  
      const view = new TabView();
      view.id = ps.id;
      target.appendChild(view);
  
      const heading = this.createElement('div', styles['ps-heading']);
      heading.innerHTML = `
        <h2>${ps.title}</h2>
        <div class="${styles['subtitle']}">${ps.subtitle}</div>
      `;
      target.appendChild(heading);

      const theProblem = this.createElement('div', styles['ps-the-problem']);
      theProblem.innerHTML = ps.problem(this.config);
      target.appendChild(theProblem);

      const theHintsWrapper = this.createElement('div', styles['ps-hints-wrapper']);
      target.appendChild(theHintsWrapper);
      ps.hints.forEach(hint => {
        const theHint = this.createElement('div', styles['ps-hint']);
        theHint.innerHTML = hint(this.config as ISeriesConfigExtended); //force
        theHintsWrapper.appendChild(theHint);
      });

      const theSolution = this.createElement('div', styles['ps-the-solution']);
      theSolution.innerHTML = ps.solution(this.config);
      target.appendChild(theSolution);
            

      this.attachActions(view, ps); //add the actions
    }
  }

  protected attachActions(target: HTMLElement, ps: IProblemSet) {
    const actions = this.createElement('div', 'actions');
    target.appendChild(actions);
    
    //todo: problem set actions
    
    const completedBtn = new ButtonSolid();
    completedBtn.classList.add(styles['completed-btn']);    
    completedBtn.classList.toggle(styles['completed'], isNotNullish(ps.completed));    
    completedBtn.innerHTML = 'mark as completed';
    this.registerEvent(completedBtn, 'click', () => this.logAction('completed'));
    actions.appendChild(completedBtn);

    const hintBtn = new ButtonSolid();
    hintBtn.classList.add(styles['hint-btn']);
    hintBtn.innerHTML = "hint";
    this.registerEvent(hintBtn, 'click', () => this.logAction('hint'));
    actions.appendChild(hintBtn);

    const solutionBtn = new ButtonSolid();
    solutionBtn.classList.add(styles['solution-btn']);
    solutionBtn.innerHTML = "hint";
    this.registerEvent(solutionBtn, 'click', () => this.logAction('solution'));
    actions.appendChild(solutionBtn);
  }

  static readonly TAG = `${PREFIX}-series-item`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesItem);
    }
  }

}