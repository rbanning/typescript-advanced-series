import { Nullable } from "../../utils";
import { BaseWebComponent } from "../base-web-component";
import { PREFIX } from "../web-components.config";

import styles from './tab-label.module.css';

export type TabLabelClickEvent = {
  target: Nullable<string>,
  active: Nullable<boolean>,
  element: TabLabel,
};

export type Format = 'tab' | 'button';

export class TabLabel extends BaseWebComponent {
  protected _target: Nullable<string>;   //as indicated by the `label-for` attribute
  get target() { return this._target; }
  set target(value: Nullable<string>) {
    this._target = value;
    this.updateComponent();
  }
  protected _active: Nullable<boolean>;
  get active() { return this._active; }
  set active(value: Nullable<boolean>) {
    this._active = value;
    this.updateComponent();
  }
  protected _disabled: Nullable<boolean>;
  get disabled() { return this._disabled; }
  set disabled(value: Nullable<boolean>) {
    this._disabled = value;
    this.updateComponent();
  }
  protected _format: Format = 'tab';
  get format() { return this._format; }
  set format(value: Format) {
    this._format = value;
    this.updateComponent();
  }

  protected originalChildNodes: Nullable<Node[]>;
  protected componentHasBeenBuilt = false;

  static observedAttributes = ["label-for", "active", "disabled", "format"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }


  attributeChangedCallback(name: string, _oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    //update ... no need to call this.updateComponent().  The property setters do that for us
    switch (name) {
      case "label-for":
        this.target = newValue;
        //this.updateComponent();
        break;
      case "active":
        this.active = newValue === 'true';
        //this.updateComponent();
        break;
      case "disabled":
        this.disabled = newValue === 'true';
        //this.updateComponent();
        break;
      case "format":
        this.format = newValue as Format;
        //this.updateComponent();
        break;
  
      default: 
        console.warn(`${TabLabel.TAG} - unsupported attribute: ${name}`);
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
      this.originalChildNodes = this.cloneChildren();
    }

    this.reset();

    this.classList.add(styles['tab-label']);
    const btn = this.createElement('btn');
    this.appendChild(btn);
    this.appendNodes(btn, this.originalChildNodes ?? []);
    this.registerEvent(btn, 'click', () => this.handleClick()); //watch for clicks

    this.updateComponent(btn);
  }

  updateComponent(btn?: Nullable<Element>) {
    //only if component has been built
    if (this.componentHasBeenBuilt) {
      this.classList.toggle(styles['format-tab'], this.format === 'tab');
      this.classList.toggle(styles['format-button'], this.format === 'button');
      this.classList.toggle(styles['active'], this.active === true);
      this.classList.toggle(styles['disabled'], this.disabled === true);
      btn ??= this.querySelector('btn');
      if (btn) {
        (btn as HTMLButtonElement).disabled = this.disabled === true || !this.target;
      }
    }
  }

  

  protected handleClick() {
    this.dispatchEvent(
      new CustomEvent<TabLabelClickEvent>(TabLabel.clickEventKey, {
        bubbles: true,
        cancelable: true,
        detail: {
          active: this.active,
          target: this.target,
          element: this
        }
      })
    )
  }

  static readonly TAG = `${PREFIX}-tab-label`;
  static readonly clickEventKey = `${this.TAG}-click`

  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, TabLabel);
    }
  }

}