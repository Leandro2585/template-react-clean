import React, { useContext } from 'react'
import { SurveyContext } from '@shared/contexts'
import Styles from './style.scss'

const SurveyError: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {state.error}
      </span>
      <button>Recarregar</button>
    </div>
  )
}

export default SurveyError
