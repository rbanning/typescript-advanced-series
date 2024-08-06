import { isNotNullish, Nullable, slugify } from "../utils";
import { welcomeConfig } from "./00-welcome/series.config";
import { onboardingConfig } from "./01-onboarding/series.config";
import { advisorConfig } from "./02-advisor/series.config";
import { ProgressTracker } from "./progress.model";
import { IProblemSet, ISeriesConfig, ISeriesConfigExtended } from "./series.types";

const configs: ISeriesConfig[] = [
  welcomeConfig,
  onboardingConfig,
  advisorConfig,
];

const seriesConfigList: ISeriesConfigExtended[] = configs.map(c => {
  return {
    ...c,
    ordinalStr: toOrdinalStr(c),
    href: toHref(c)
  }
});

//sort to ensure correct order
seriesConfigList.sort((a,b) => a.ordinal - b.ordinal);


//#region >> Series Repository <<

type FindPredicate = (m: ISeriesConfigExtended) => boolean;

class SeriesRepository {
  protected readonly store: ISeriesConfigExtended[];
  protected readonly progressTracker = new ProgressTracker();

  constructor() {
    this.store = configs.map(c => {
      return {
        ...c,
        ordinalStr: toOrdinalStr(c),
        href: toHref(c)
      }
    });
    this.store.sort((a,b) => a.ordinal - b.ordinal);
  }


  list(): ISeriesConfigExtended[] {
    return this.store.map(m => this.clone(m));
  }

  get(id: Nullable<string>): Nullable<ISeriesConfigExtended> {
    return this.clone(this.store.find(m => m.id === id));
  }

  find(predicate: FindPredicate) {
    return this.clone(this.list().find(predicate));
  }

  setCompleted(problemSetId: string, date?: Date) {
    date ??= new Date();
    this.progressTracker.update(problemSetId, date);
  }
  
  isCompleted(problemSetId: string): boolean {
    return isNotNullish(this.progressTracker.get(problemSetId));  
  }


  protected clone(series: Nullable<ISeriesConfigExtended>): ISeriesConfigExtended {
    if (isNotNullish<ISeriesConfigExtended>(series)) {
      return {
        ...series,   //todo: do a deep(er) clone?
        problems: (series.problems ?? []).map(ps => this.loadProblemSet(ps)),
      } as ISeriesConfigExtended;
    }
    //else
    throw new Error("Missing or invalid SeriesConfig - please check your request");
  }

  protected loadProblemSet(ps: IProblemSet): IProblemSet {
    ps.completed = this.progressTracker.get(ps.id);
    return ps; //todo: create ps clone
  }

}

export const seriesRepository = new SeriesRepository();

//#endregion

//#region >> HELPERS <<

function toOrdinalStr(config: ISeriesConfig) {
  return config.ordinal.toString().padStart(2, '0');
}

function toHref(config: ISeriesConfig) {
  return './' + slugify(`series-${toOrdinalStr(config)}-${config.title}`);
}


//#endregion