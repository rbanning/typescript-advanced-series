import { Nullable } from '../../utils';
import { PREFIX } from '../web-components.config';
import styles from './unsplash-image.module.css';

import { unsplashRepo } from './unsplash-repo';
import { IUnsplash } from './unsplash.type';


function UnsplashImageCredit(photo: IUnsplash): HTMLElement {
  const div = document.createElement("div");
  div.classList.add(styles.credit);
  div.innerHTML = `
      Photo by <a href="${photo.credit.photographer.portfolio}" target="unsplash">${photo.credit.photographer.name}</a> 
      on <a href="${photo.credit.url}" target="unsplash">UnSplash</a>
  `;
  return div;
}




export class UnsplashImage extends HTMLElement {
  private width: Nullable<number>;
  private key: Nullable<string>;

  static observedAttributes = ["size", "key"]

  constructor() {
    super();
  }

  connectedCallback() {
    this.buildComponent();
  }

  attributeChangedCallback(name: string, oldValue: Nullable<string>, newValue: Nullable<string>) {
    let requireRefresh = !!this.querySelector(`.${styles['unsplash-image']}`);

    switch (name) {
      case "key":
        this.key = unsplashRepo.some(m => m.id === newValue) ? newValue : oldValue;
        requireRefresh = requireRefresh && this.key !== oldValue;
        break;
      case "size":
        const _size = parseInt(newValue ?? '');
        if (!isNaN(_size)) {
          requireRefresh = requireRefresh && this.width !== _size;
          this.width = _size;
        } else {
          requireRefresh = false;
        }
        break;
      default: 
          console.warn(`${UnsplashImage.TAG} - unsupported attribute: ${name}`);
          requireRefresh = false;
          break;
    }

    if (requireRefresh) {
      this.buildComponent();
    }
  }

  private buildComponent () {
    const unsplash = unsplashRepo.find(m => m.id === this.key);
    
    if (unsplash) { 
      this.reset(); //clear any existing child nodes/elements
           
      const wrapper = document.createElement('div');  
      wrapper.classList.add(styles['unsplash-image']);
      const inner = document.createElement('div');
      inner.classList.add(styles.inner);
      wrapper.appendChild(inner);

      const image = new Image();
      inner.appendChild(image);
      inner.appendChild(UnsplashImageCredit(unsplash));

      if (this.width) {
        image.width = this.width;
      } else {
        wrapper.classList.add(styles.full);
      }

      image.onload = () => {
        //success - append to target
        this.appendChild(wrapper);
        console.log("Unsplash Image loaded", {unsplash, wrapper});
      };
      
      image.onerror = (e) => {
        console.warn("Error loading specified unsplash image", {key: this.key, unsplash, e});
      };
      image.alt = unsplash.description;
      image.src = unsplash.src;   //loads
    }
    else {
      console.log("could not find the request unsplash image from the key", {key: this.key});
    }
  }

  private reset() {
    while(this.firstChild) {
      this.firstChild.remove();
    }
  }

  static readonly TAG = `${PREFIX}-unsplash-image`;
  static define() {
    if (!customElements.get(this.TAG)) {
      customElements.define(this.TAG, UnsplashImage);
    }
  }
}
