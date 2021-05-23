import React, { useContext } from 'react'
import Styles from './style.scss'
import Spinner from '../spinner'
import FormContext from '../../contexts/FormContext'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { state.isLoading && <Spinner className={Styles.spinner}/> }
      { state.mainError && <span className={Styles.error}>{state.mainError}</span> }
    </div>
  )
}

export default FormStatus
