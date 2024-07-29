import { UnsplashImage } from "./unsplash-image/unsplash-image"

export const attach = {
  
  UnsplashImage

} as const;


export function waitForElementToLoad ( query: string, delay: number = 250, retry: number = 5) : Promise<HTMLElement> {
  const getElement = () => document.querySelector(query);
  let element = getElement();

  return new Promise( async (resolve, reject) => {

    for(let count=0; count < retry && !element; count++) {
      await new Promise<boolean>((done) => {
        setTimeout(() => {
          element = getElement();
          done(true);
        }, delay);
      }) 
    }
    if (element) { resolve (element as HTMLElement); }
    else { reject('Unable to find target element'); }
  });
}