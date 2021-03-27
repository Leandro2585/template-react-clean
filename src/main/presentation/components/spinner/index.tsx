import React from 'react'
import styles from './style.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[styles.spinner, props.className].join(' ')}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  )
}

export default Spinner
