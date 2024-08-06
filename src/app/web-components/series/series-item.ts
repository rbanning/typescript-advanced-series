import { Nullable } from "../../utils";
import { UnsplashImage } from "../unsplash-image/unsplash-image";
import { PREFIX } from "../web-components.config";
import { SeriesBaseComponent } from "./series-base-component";
import { SeriesHeading } from "./series-heading/series-heading";
import { SeriesIntro } from "./series-intro/series-intro";
import { SeriesObjectives } from "./series-objectives/series-objectives";

import styles from './series-item.module.css';
import { ButtonSolid } from "../button/button-solid";

type SeriesViews = {
  intro: Nullable<HTMLElement>,
  questions: Nullable<HTMLElement>
}

export class SeriesItem extends SeriesBaseComponent {
  protected hero: Nullable<HTMLElement>;
  protected views: SeriesViews = {
    intro: null,
    questions: null
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

      this.appendChild(this.views.intro);

    }    
  }

  protected getStarted() {
    console.log(">>> get started");
  }

  static readonly TAG = `${PREFIX}-series-item`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, SeriesItem);
    }
  }

}