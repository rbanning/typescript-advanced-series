import { equals, Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";
import { TabLabel, TabLabelClickEvent } from "./tab-label";
import { TabView } from "./tab-view";

import styles from './tabs-horizontal.module.css';

export type ProgressionState = {
  pending: string[],
  completed: string[],
  current: Nullable<string>
}

const defaultState: ProgressionState = {
  pending: [],
  completed: [],
  current: null
};

export class TabsProgression extends BaseWebComponent {
  protected tabs: TabLabel[] = [];
  protected views: TabView[] = [];
  protected componentHasBeenBuilt = false;

  protected current: Nullable<string>;
  get state(): ProgressionState {
    //keep immutable
    return {
      pending: this.tabs.filter(m => 
        m.target //must have a target
        && m.disabled //musth be disabled
      ).map(m => m.target ?? ''),
      completed: this.tabs.filter(m => 
        m.target  //must have a target
        && !m.active  //the active target is not considered completed
        && !m.disabled  //cannot be disabled
      ).map(m => m.target ?? ''),
      current: this.current
    };
  }

  static observedAttributes = []

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, _oldValue: Nullable<string>, _newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      default: 
        console.warn(`${TabsProgression.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }

  setCompleted(target: string) {
    if (!this._state.completed.includes(target)) {
      this._state.completed.push(target);
    }
  }

  protected buildComponent() {
    if (!this.componentHasBeenBuilt) {
      this.componentHasBeenBuilt = true;
      const originalChildNodes = this.cloneChildren();
      this.tabs = originalChildNodes
        .filter(node => equals(node.nodeName, TabLabel.TAG, true))
        .map(node => node as TabLabel);
      this.views = originalChildNodes
        .filter(node => equals(node.nodeName, TabView.TAG, true))
        .map(node => node as TabView);
    }

    this.reset();

    this.classList.add(styles['tabs-wrapper']);

    const labels = this.createElement('div', styles['labels']);
    this.appendChild(labels);
    this.tabs.forEach((t, index) => {
      t.active = index === 0; //first tab must be active
      labels.appendChild(t);
      this.registerEvent(t, TabLabel.clickEventKey, (e) => this.handleTabClick(e as CustomEvent));
    });

    const views = this.createElement('div', styles['views']);
    this.appendChild(views);
    this.views.forEach(v => views.appendChild(v));

    //update state
    this._state = {
      ...defaultState,
      current: this.tabs.find(m => m.active === true)?.target
    };

    this.updateComponent();
  }

  protected updateComponent() {
    //note: use state to determine active and disabled

    //reset
    this.tabs.forEach(m => {
      m.setAttribute('active', `${this._state.current === m.target}`);
      m.setAttribute('disabled', `${this._state.pending.includes(m.target ?? '')}`);
    });
    this.views.forEach(m => {
      m.setAttribute('active', `${this._state.current === m.id}`);
      m.setAttribute('disabled', `${this._state.pending.includes(m.id)}`);
    });
  }

  protected handleTabClick(e: CustomEvent<TabLabelClickEvent>) {
    const detail: TabLabelClickEvent = e.detail;
    this._state.current = detail.target;
    this.updateComponent();
  }


  static readonly TAG = `${PREFIX}-tabs-progression`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, TabsProgression);
    }
  }

}