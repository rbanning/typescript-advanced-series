import { Nullable } from './../utils/nullable.type';
import { jsonDate, storageVault } from "../utils";
import { obfuscate, unravel } from "../utils/obfuscate";

export interface IProgressItem {
  id: string;
  date: Nullable<Date>;
};

export class ProgressTracker {
  protected readonly KEY = "progress";

  protected _store: IProgressItem[] = [];
  get store(): IProgressItem[] {
    return this._store.map(m => ({...m}));
  }
  
  protected readonly vault!: Storage;
  
  constructor() {
    //note: you can change the storage vault to another entity that implements Storage
    this.vault = storageVault('localStorage');
    this.refresh();
  }
  


  refresh() {
    //attempt to get the progress stats from storage
    const cache = this.vault.getItem(this.KEY);
    if (cache) {
      const progress = JSON.parse(unravel(cache)); //remove obfuscation
      if (Array.isArray(progress)) {
        this._store = progress.map(this.parseProgress)
        //remove errors
        .filter(Boolean) as IProgressItem[]; //cast because TS still thinks there might be nulls        
      }
    }
  }


  get(id: string): Nullable<Date> {
    return this._store.find(m => m.id === id)?.date;
  }


  update(id: string, date?: Date) {
    date ??= new Date();
    const index = this._store.findIndex(m => m.id === id);

    if (index) {
      this._store[index].date = date;
    } else {
      this._store.push({ id, date});
    }

    this.save();
  }


  //#region >> HELPERS <<

  protected save() {
    const code = obfuscate(this.stringifyProgress(this._store));
    this.vault.setItem(this.KEY, code);
  }

  protected parseProgress(value: unknown): Nullable<IProgressItem> {
    if (value
      &&  typeof(value) === 'object' 
      && 'id' in value 
      &&  'date' in value) {
      return {
        id: `${value.id}`,  
        date: jsonDate.parse(`${value.date}`)
      } as IProgressItem;
    }
    //else
    return null;
  }

  protected stringifyProgress(value: IProgressItem[]): string {
    return JSON.stringify(value.map(p => ({
        ...p,
        date: p.date ? jsonDate.stringify(p.date) : null    //convert Date to string BEFORE performing JSON.stringify
    })));
  }

  //#endregion
}