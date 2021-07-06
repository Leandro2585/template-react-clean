import React, { useContext } from 'react'
import { FormContext } from '@shared/contexts'

type Props = {
  text: string;
  state: any;
}

const Button: React.FC<Props> = ({ text, state }: Props) => {
  return (
    <button
      disabled={state.isFormInvalid}
      data-testid="submit"
      type="submit">
      {text}
    </button>
  )
}

export default Button
