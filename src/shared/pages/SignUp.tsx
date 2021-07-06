import React, { useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Footer, FormStatusWrapper as FormStatus, InputContainer as Input, LoginHeader, ButtonContainer as Button } from '@shared/components'
import { ApiContext, FormContext } from '@shared/contexts'
import { Validation } from '@shared/protocols'
import { AddAccount } from '@domain/usecases'
import { signUpState } from '@shared/atoms'
import Styles from '@shared/styles/signup.scss'

type Props = {
  validation: Validation;
  addAccount: AddAccount;
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('confirmPassword'), [state.confirmPassword])

  const validate = (field: string): void => {
    const { name, email, password, confirmPassword } = state
    const formData = { name, email, password, confirmPassword }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.confirmPasswordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await addAccount.create({
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...state,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form onSubmit={handleSubmit} data-testid="form" className={Styles.form}>
          <h2>Sign Up</h2>
          <Input currentState={signUpState} type="text" name="name" placeholder="Digite seu nome" />
          <Input currentState={signUpState} type="email" name="email" placeholder="Digite seu e-mail" />
          <Input currentState={signUpState} type="password" name="password" placeholder="Digite sua senha" />
          <Input currentState={signUpState} type="password" name="confirmPassword" placeholder="Confirme sua senha" />
          <Button currentState={signUpState} text="Cadastrar"/>
          <Link data-testid="login-link" to="/login" className={Styles.link} replace>Voltar para login</Link>
          <FormStatus currentState={signUpState}/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default SignUp
