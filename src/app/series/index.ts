import { welcomeConfig } from "./00-welcome/series.config";
import { onboardingConfig } from "./01-onboarding/series.config";
import { advisorConfig } from "./02-advisor/series.config";
import { ISeriesConfig } from "./series.types";

export const seriesConfigList: ISeriesConfig[] = [
  welcomeConfig,
  onboardingConfig,
  advisorConfig,
];

//sort to ensure correct order
seriesConfigList.sort((a,b) => a.ordinal - b.ordinal);