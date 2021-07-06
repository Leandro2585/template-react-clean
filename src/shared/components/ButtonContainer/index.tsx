import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Button } from '@shared/components'

type Props = {
  text: string;
  currentState: RecoilState<any>;
}

const ButtonContainer: React.FC<Props> = ({ text, currentState }: Props) => {
  const [state] = useRecoilState(currentState)
  return (
    <Button text={text} state={state}/>
  )
}

export default ButtonContainer
