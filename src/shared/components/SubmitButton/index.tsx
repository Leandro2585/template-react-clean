import React, { useContext } from 'react'
import { FormContext } from '@shared/contexts'

type Props = {
  text: string;
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)
  return (
    <button disabled={state.isFormInvalid} data-testid="submit" type="submit">
      {text}
    </button>
  )
}

export default SubmitButton
