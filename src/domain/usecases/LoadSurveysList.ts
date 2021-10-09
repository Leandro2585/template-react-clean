import { SurveyModel } from '@domain/models'

export interface LoadSurveysList {
  loadAll(): Promise<LoadSurveysList.Model[]>;
}

export namespace LoadSurveysList {
  export type Model = {
    id: string;
    question: string;
    date: Date;
    didAnswer: boolean;
  };
}
