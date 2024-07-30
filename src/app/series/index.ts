import { slugify } from "../utils";
import { welcomeConfig } from "./00-welcome/series.config";
import { onboardingConfig } from "./01-onboarding/series.config";
import { advisorConfig } from "./02-advisor/series.config";
import { ISeriesConfig, ISeriesConfigExtended } from "./series.types";

const configs: ISeriesConfig[] = [
  welcomeConfig,
  onboardingConfig,
  advisorConfig,
];

export const seriesConfigList: ISeriesConfigExtended[] = configs.map(c => {
  return {
    ...c,
    ordinalStr: toOrdinalStr(c),
    href: toHref(c)
  }
});

//sort to ensure correct order
seriesConfigList.sort((a,b) => a.ordinal - b.ordinal);



//#region >> HELPERS <<

function toOrdinalStr(config: ISeriesConfig) {
  return config.ordinal.toString().padStart(2, '0');
}

function toHref(config: ISeriesConfig) {
  return './' + slugify(`series-${toOrdinalStr(config)}-${config.title}`);
}


//#endregion