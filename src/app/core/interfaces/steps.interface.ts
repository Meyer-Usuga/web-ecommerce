import { StepsCheckoutEnum } from '@interface/enums';

export interface Steps {
  step: StepsCheckoutEnum;
  label: string;
  active: boolean;
}
