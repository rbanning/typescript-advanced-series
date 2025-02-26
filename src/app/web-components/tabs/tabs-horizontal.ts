import { equals, Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";
import { Format, TabLabel, TabLabelClickEvent, updateFormatStyles } from "./tab-label";
import { TabView } from "./tab-view";

import styles from './tabs-horizontal.module.css';


export class TabsHorizontal extends BaseWebComponent {
  protected tabs: TabLabel[] = [];
  protected views: TabView[] = [];
  protected componentHasBeenBuilt = false;



  static observedAttributes = ["format"]
  protected _format: Format = 'tab';
  get format(): Format {
    return this._format;
  }
  set format (value: Format) {
    this._format = value;
    this.updateComponent();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, _oldValue: Nullable<string>, _newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "format":
        this.format = _newValue as Format;  //automatically calls updateComponent
        break;
      default: 
        console.warn(`${TabsHorizontal.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
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
      if (index > 0) {
        const spacer = this.createElement('span', styles['spacer']);
        spacer.innerHTML = "&raquo;";
        labels.appendChild(spacer);
      }
      labels.appendChild(t);
      this.registerEvent(t, TabLabel.clickEventKey, (e) => this.handleTabClick(e as CustomEvent));
    });

    const views = this.createElement('div', styles['views']);
    this.appendChild(views);
    this.views.forEach(v => views.appendChild(v));

    this.updateComponent();
  }

  protected updateComponent(target?: Nullable<string>) {
    if (this.componentHasBeenBuilt) {
      //format
      updateFormatStyles(this, styles, this.format);      
      this.tabs.forEach(tab => {
        tab.format = this.format;
      });

      // get the active one
      const active = this.tabs.find(m => typeof(target) === 'string' ? m.target === target : m.active === true);
      //reset
      this.tabs.forEach(m => {
        m.setAttribute('active', `${active?.target === m.target}`);
      });
      this.views.forEach(m => {
        m.setAttribute('active', `${active?.target === m.id}`);
      });
    }
  }

  protected handleTabClick(e: CustomEvent<TabLabelClickEvent>) {
    const detail: TabLabelClickEvent = e.detail;
    this.updateComponent(detail.target);
  }


  static readonly TAG = `${PREFIX}-tabs-horizontal`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, TabsHorizontal);
    }
  }

}