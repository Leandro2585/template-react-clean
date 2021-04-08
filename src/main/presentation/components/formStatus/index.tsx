import React, { useContext } from 'react'
import styles from './style.scss'
import Spinner from '../spinner'
import FormContext from '../../contexts/FormContext'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { state.sLoading && <Spinner className={styles.spinner}/> }
      { errorState.main && <span className={styles.error}>{errorState.main}</span> }
    </div>
  )
}

export default FormStatus
