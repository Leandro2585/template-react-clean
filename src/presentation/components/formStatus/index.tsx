import React, { useContext } from 'react'
import styles from './style.scss'
import Spinner from '../spinner'
import FormContext from '../../contexts/FormContext'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { state.isLoading && <Spinner className={styles.spinner}/> }
      { state.mainError && <span className={styles.error}>{state.mainError}</span> }
    </div>
  )
}

export default FormStatus
