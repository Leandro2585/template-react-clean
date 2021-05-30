import React, { useContext } from 'react'
import { Spinner } from '@shared/components'
import { FormContext } from '@shared/contexts'
import Styles from './style.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner className={Styles.spinner}/> }
      { mainError && <span data-testid="main-error" className={Styles.error}>{state.mainError}</span> }
    </div>
  )
}

export default FormStatus
