import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@shared/components'
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
    isFormInvalid: true,
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
    const { name, email, password, confirmPassword } = state
    const formData = { name, email, password, confirmPassword }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const confirmPasswordError = validation.validate('confirmPassword', formData)
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!confirmPasswordError
    })
  }, [state.name, state.email, state.password, state.confirmPassword])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
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
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="confirmPassword" placeholder="Confirme sua senha" />
          <SubmitButton text="Cadastrar"/>
          <Link data-testid="login-link" to="/login" className={Styles.link} replace>Voltar para login</Link>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default SignUp
