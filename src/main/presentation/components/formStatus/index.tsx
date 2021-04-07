import React, { useContext } from 'react'
import styles from './style.scss'
import Spinner from '../spinner'
import FormContext from '../../contexts/FormContext'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner}/> }
      { errorMessage && <span className={styles.error}>{errorMessage}</span> }
    </div>
  )
}

export default FormStatus
