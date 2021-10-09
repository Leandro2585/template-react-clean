import React, { useRef } from 'react'
import Styles from './style.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any;
  setState: any;
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState(old => ({
      ...old,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div
      className={Styles.inputWrap}
      data-testid={`${props.name}-wrap`}
      data-status={error ? 'invalid' : 'valid'}>
      <input
        {...props}
        placeholder=" "
        ref={inputRef}
        title={error}
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={handleChange}/>
      <label
        title={error}
        data-testid={`${props.name}-label`}
        onClick={() => inputRef.current.focus()}>
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
