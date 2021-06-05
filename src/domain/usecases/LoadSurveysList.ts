import { SurveyModel } from '@domain/models'

export interface LoadSurveysList {
  loadAll(): Promise<LoadSurveysList.Result>;
}

export namespace LoadSurveysList {
  export type Result = SurveyModel[];
}
