import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Input } from '@shared/components'

type Props = {
  type: string;
  name: string;
  placeholder: string;
  currentState: RecoilState<any>;
}

const InputContainer: React.FC<Props> = ({ name, type, placeholder, currentState }: Props) => {
  const [state, setState] = useRecoilState(currentState)
  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default InputContainer
