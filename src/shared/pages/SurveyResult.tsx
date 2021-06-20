import React from 'react'
import FlipMove from 'react-flip-move'
import { Header, Loading } from '@shared/components'
import Styles from '@shared/styles/surveyresult.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header/>
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png"/>
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        { false && <Loading/>}
      </div>
    </div>
  )
}

export default SurveyResult
