export type RemoteSurveyModel = {
  id: string;
  question: string;
  answers: RemoteSurveyAnswerModel[];
  date: Date;
  didAnswer: boolean;
}

type RemoteSurveyAnswerModel ={
  image?: string;
  answer: string;
}
