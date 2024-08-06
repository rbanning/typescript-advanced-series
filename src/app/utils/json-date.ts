
class JsonDate {

  stringify (d: Date) {
    if (d instanceof Date) {
      return d.toISOString();
    }
    //else
    throw new Error("JsonDate encode() expects a valid Date object");
  }

  parse (code: string) {
    if (code) {
      //using Date.parse() to convert to timestamp so we can check validity of date string
      //new Date('some invalid date') fails with a .valueOf() NaN which (to me) is less intuitive to check
      const timestamp = Date.parse(code);
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      }
    }
    //else
    return null;  //fail quietly
  }
}

export const jsonDate = new JsonDate();