import { isNullish } from "./nullable.type";

type Transformer = (x: string) => string;

class Base64 {
  protected readonly _encoder!: Transformer;
  protected readonly _decoder!: Transformer;

  constructor() {
    if (window && 'btoa' in window && 'atob' in window) {
      this._encoder = window.btoa;
      this._decoder = window.atob;
    } 
    else {
      throw new Error("Error initializing Base64 class - looks like your system does not support our known encode/decode methods");
    }
  }

  encode(value: unknown): string {
    if (isNullish(value) 
      || typeof(value) === 'function'
      || typeof(value) === 'symbol') {
        
        throw new Error("Error encoding to base64 - cannot convert value to a string!");
    }
    else if (typeof(value) === 'object') {
        return this._encoder(JSON.stringify(value));
    }
    //else
    return this._encoder(`${value}`);   //note: encoder always converts to a string! 
  }

  decode(value: string): string {
    if (isNullish(value)) {        
        throw new Error("Error decoding to base64 - cannot convert value to a string!");
    }
    //else
    return this._decoder(value); 
  }
}

export const base64 = new Base64();

