import React from 'react'
import { SurveyResultAnswerModel } from '@domain/models'
import Styles from './style.scss'
import { onSurveyAnswerState } from '@shared/atoms'
import { useRecoilValue } from 'recoil'

type Props = {
  answer: SurveyResultAnswerModel;
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)

  const handleAnswerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }

  return (
    <li
      key={answer.answer}
      onClick={handleAnswerClick}
      data-testid="answer-wrap"
      className={answer.isCurrentAccountAnswer ? Styles.active : ''}
    >
      <img data-testid="image" src={answer.image} alt={answer.answer}/>
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
