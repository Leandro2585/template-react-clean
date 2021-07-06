import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { FormStatus } from '@shared/components'

type Props = {
  currentState: RecoilState<any>;
}

const FormStatusWrapper: React.FC<Props> = ({ currentState }: Props) => {
  const [state] = useRecoilState(currentState)
  return <FormStatus state={state}/>
}

export default FormStatusWrapper
