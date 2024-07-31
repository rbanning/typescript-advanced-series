

import { copyToClipboard, Nullable } from '../../utils';
import { BaseWebComponent } from '../base-web-component';
import { PREFIX } from '../web-components.config';

import styles from './code-block.module.css';

export class CodeBlock extends BaseWebComponent {
  static observedAttributes = ["language"]
  
  protected language: string = "Typescript";
  protected codeToLoad: Nullable<string>;


  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();    
  }

  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = this.childNodes.length > 0;

    switch (name) {
      case "language":
        this.language = newValue ?? this.language;
        requireRefresh = requireRefresh && (newValue !== oldValue);
        break;
      default: 
        console.warn(`${CodeBlock.TAG} - unsupported attribute: ${name}`);
        requireRefresh = false;
        break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }


  protected buildComponent() {
    if (!this.querySelector(styles['code-block'])) {
      console.log(">>> inner ", {text: this.innerText, html: this.innerHTML});
      this.codeToLoad = this.innerHTML;
    }
    this.reset();

    const div = this.createElement('div', styles['code-block']);
    this.appendChild(div);

    const heading = this.createElement('div', styles['heading']);
    div.appendChild(heading);
    const title = this.createElement('div', styles['title']);
    title.innerText = this.language;
    heading.appendChild(title);
    const btn = this.createElement('button');
    btn.title = "copy the code";
    btn.ariaLabel = "copy the code in this code-block"
    btn.innerHTML = `<kpc-copy-icon mode="light" style="font-size: 1.1rem;"></kpc-copy-icon>`;
    btn.addEventListener('click', () => this.copy());
    heading.appendChild(btn);

    
    const pre = this.createElement('pre');
    div.appendChild(pre);
    const code = this.createElement('code');
    pre.appendChild(code);

    code.innerHTML = this.codeToLoad ?? "//empty code block";    
    //hljs.highlightElement(code);


  }


  protected copy() {
    const code = this.querySelector('code');
    if (code) {
      const content = code.innerText;
      copyToClipboard(content)
        .then(() => {
          console.log("Code has been copied to your clipboard");
        })
        .catch((reason) => {
          console.warn("Unable to copy code", {reason});
        })
    }
  }

  //override
  reset() {
    //first remove any event listeners
    const code = this.querySelector('code');
    if (code) {
      code.removeEventListener('click', () => this.copy());
    }

    //now clear
    super.reset();
  }

  static readonly TAG = `${PREFIX}-code-block`;
  static define() {
    const me = customElements.get(this.TAG);
    if (!me) {
      customElements.define(this.TAG, CodeBlock);
    }
  }
}

