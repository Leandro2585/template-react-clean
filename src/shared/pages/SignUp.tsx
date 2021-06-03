import React, { useState, useEffect } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@shared/components'
import { FormContext } from '@shared/contexts'
import { Validation } from '@shared/protocols'
import Styles from '@shared/styles/signup.scss'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      confirmPasswordError: validation.validate('confirmPassword', state.confirmPassword)
    })
  }, [state.name, state.email, state.password, state.confirmPassword])

  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Sign Up</h2>
          <Input type="text" name="text" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="confirmPassword" placeholder="Confirme sua senha" />
          <button disabled data-testid="submit" type="submit" className={Styles.submit}>
            Cadastrar
          </button>
          <span className={Styles.link}>Ir para login</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default SignUp
