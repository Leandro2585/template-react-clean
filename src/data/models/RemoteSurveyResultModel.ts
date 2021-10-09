export type RemoteSurveyResultAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
}

export type RemoteSurveyResultModel = {
  question: string;
  date: string;
  answers: RemoteSurveyResultAnswerModel[]
}
