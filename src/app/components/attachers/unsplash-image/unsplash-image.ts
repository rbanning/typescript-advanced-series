import { AttacherMethodResult } from '../attacher.types';
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


export function UnsplashImage(
  target: HTMLElement, 
  id: string, 
  width: number): AttacherMethodResult {
  const unsplash = unsplashRepo.find(m => m.id === id);
  if (unsplash) {
    return new Promise<boolean>((resolve, reject) => {
      const wrapper = document.createElement('div');  
      wrapper.classList.add(styles['unsplash-image']);
      const inner = document.createElement('div');
      inner.classList.add(styles.inner);
      wrapper.appendChild(inner);

      const image = new Image();
      inner.appendChild(image);
      inner.appendChild(UnsplashImageCredit(unsplash));

      image.width = width;

      image.onload = () => {
        //success - append to target
        target.appendChild(wrapper);
        resolve(true);
      };
      
      image.onerror = (e) => {
        console.warn("Error loading specified unsplash image", {src: id, unsplash, e});
        reject("Error loading Unsplash image");
      };
      image.alt = unsplash.description;
      image.src = unsplash.src;   //loads
    })
  }
  return Promise.reject('could not find the UnSplash image requested');
}