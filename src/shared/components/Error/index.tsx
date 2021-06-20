import React, { useContext } from 'react'
import { SurveyContext } from '@shared/contexts'
import Styles from './style.scss'

type Props = {
  error: string;
  reload(): void;
}

const SurveyError: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">
        {error}
      </span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default SurveyError
