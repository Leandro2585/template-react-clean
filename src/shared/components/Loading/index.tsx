import React from 'react'
import { Spinner } from '@shared/components'
import Styles from './style.scss'

const Loading: React.FC = () => {
  return (
    <div className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative/>
      </div>
    </div>
  )
}

export default Loading
