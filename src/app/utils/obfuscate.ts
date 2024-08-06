import { base64 } from "./base64";
import { randomString } from "./random";

const DEFAULT_SIZE = 4 as const;

export function obfuscate(value: unknown, size: number = DEFAULT_SIZE) {
  const noise = randomString(size, 'mixed', true);
  let body = base64.encode(`${value}`);

  //remove the equal sign filler at the end
  let count = 0;
  while(body.endsWith('=')) {
    count += 1;
    body = body.substring(0, body.length-1);
  }
  if (count > 0) {
    body += `.${randomString(count, 'mixed')}`;
  }
  
  return noise + body;
}

export function unravel(code: string, size: number = DEFAULT_SIZE) {
  //remove noise
  code = code.substring(size);

  //replace equal size(s)
  const parts = code.split('.');
  if (parts.length > 2) {
    throw new Error("Unable to remove obfuscation (unravel) - code contains invalid characters");
  }
  else if (parts.length === 1) {
    //do nothing, code is fine (no filler)
  }
  else { // (parts.length === 2) 
    let count = parts[1].length;
    code = parts[0];
    while (count > 0) {
      count += -1;
      code += '=';
    }
  } 

  return base64.decode(code);
}