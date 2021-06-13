import React, { useContext } from 'react'
import { SurveyContext } from '@shared/contexts'
import Styles from './style.scss'

const SurveyError: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {state.error}
      </span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default SurveyError
