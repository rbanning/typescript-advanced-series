const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

export function randomString(length: number, mode: 'lowercase' | 'uppercase' | 'mixed', inclDigits: boolean = false) {
  const chars: string = inclDigits ? (alpha + digits) : alpha;
  let ret = "";
  for(let i=0; i<length; i++) {
    ret += chars.charAt(Math.floor(Math.random() * chars.length));
  } 
  switch(mode) {
    case 'lowercase': return ret.toLocaleLowerCase();
    case 'uppercase': return ret.toLocaleUpperCase();

    case 'mixed':
    default: 
      return ret;
  }
}

export function randomize(value: unknown) {
  if (Array.isArray(value)) {
    return randomizeArray(value);
  }
  else if(typeof(value) === 'string') {
    return randomizeString(value);
  }
  //else
  throw new Error("`randomize()` cannot process a value of type: " + typeof(value));
}

function randomizeString(value: string): string {
  const array = randomizeArray(value.split(''));
  return array.join('');
}

function randomizeArray<T>(value: T[]): T[] {
  const clone = [...value];
  const ret: T[] = [];
  while(clone.length > 0) {
    const index = Math.floor(Math.random() * clone.length);
    ret.push(clone[index]);
    clone.slice(index);
  }
  return ret;
}