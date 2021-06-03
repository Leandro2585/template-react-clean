import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader } from '@shared/components'
import { FormContext } from '@shared/contexts'
import { Validation } from '@shared/protocols'
import { AddAccount, SaveAccessToken } from '@domain/usecases'
import Styles from '@shared/styles/signup.scss'

type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.confirmPasswordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await addAccount.create({
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
      })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form onSubmit={handleSubmit} data-testid="form" className={Styles.form}>
          <h2>Sign Up</h2>
          <Input type="text" name="text" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="confirmPassword" placeholder="Confirme sua senha" />
          <button disabled={!!state.nameError || !!state.emailError || !!state.confirmPasswordError || !!state.confirmPasswordError} data-testid="submit" type="submit" className={Styles.submit}>
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
