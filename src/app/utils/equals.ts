import { isNullish, Nullable } from './nullable.type';
export function equals(a: unknown, b: unknown, caseInsensitive?: Nullable<boolean>) {

  //null and/or undefined items can never be equal
  if (isNullish(a) ?? isNullish(b)) { return false; }

  const aStr = `${a}`;
  const bStr = `${b}`;

  return caseInsensitive
    ? aStr.toLocaleLowerCase() === bStr.toLocaleLowerCase()
    : aStr === bStr;
}