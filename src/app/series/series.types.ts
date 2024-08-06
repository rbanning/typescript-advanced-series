import { Nullable } from './../utils/nullable.type';
export interface IObjective {
  id: string;
  title: string;
  description: string;
  completed?: Nullable<boolean>;
}

export interface ICoreInfo {
  id: string;
  ordinal: number;
  title: string;
  subtitle: string;
}

export interface ISeriesConfig extends ICoreInfo {
  introduction: string;
  objectives?: IObjective[];
  problems?: IProblemSet[];
}

export interface ISeriesConfigExtended extends ISeriesConfig {
  ordinalStr: string;
  href: string;  
}

export type ProblemSetMiniView = (series: ISeriesConfigExtended) => string;


export interface IProblemSet extends ICoreInfo {
  label?: string;                //optional label used in the tab (defaults to title) 
  problem: ProblemSetMiniView; //the view of the problem
  hints: ProblemSetMiniView[];  //hints for the problem
  solution: ProblemSetMiniView; //one solution
  completed?: Nullable<Date>;   //date problem set was completed
}