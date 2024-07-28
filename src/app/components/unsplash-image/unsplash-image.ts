import { unsplashRepo } from './unsplash-repo';

export function UnsplashImage(
  target: HTMLElement,
  src: string
) {
  const unsplash = unsplashRepo.find(m => m.src === src);
  if (unsplash) {
    const image = new Image();
    image.onload = () => {
      //todo: wrap the image into a component that includes the photo credit info
      target.appendChild(image);
    };
    image.onerror = (e) => {
      console.warn("Error loading specified unsplash image", {src, unsplash, e})
    };
    image.alt = unsplash.description;
    image.src = unsplash.src;
    return true;
  }
  return false;
}