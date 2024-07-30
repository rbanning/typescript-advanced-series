

export interface ISeriesConfig {
  id: string;
  ordinal: number;
  title: string;
  subtitle: string;
  introduction: string;
}

export interface ISeriesConfigExtended extends ISeriesConfig {
  ordinalStr: string;
  href: string;  
}