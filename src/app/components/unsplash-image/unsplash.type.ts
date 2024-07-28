export type UnsplashUrl = `https://unsplash.com/${string}`;

export type Photographer = {
  name: string;
  portfolio: UnsplashUrl;
}
export type Credit = {
  url: UnsplashUrl;
  photographer: Photographer;
}

export interface IUnsplash {
  id: string;
  src: string;
  description: string;
  credit: Credit;
  tags: string[];
}