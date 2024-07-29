
import styles from './test.module.css';

export class Test extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    //const shadow = this.attachShadow({mode: "open"});

    this.classList.add(styles.test);

    const span = document.createElement('span');
    span.classList.add(styles.span);
    span.innerText = "Hello Span";
    
    this.appendChild(span);
  }

  static readonly TAG = "ui-test";
  static define() {
    const me = customElements.get(this.TAG);
    if (!me) {
      customElements.define(this.TAG, Test);
    }
  }
}

