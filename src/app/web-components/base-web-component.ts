
export abstract class BaseWebComponent extends HTMLElement {

  constructor() {
    super();    
  }

  connectedCallback() {
    this.buildComponent();
  }


  protected buildComponent() {
    //add build implementation here
  }


  protected reset() {
    while(this.firstChild) {
      this.firstChild.remove();
    }
  }

}