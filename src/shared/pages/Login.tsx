import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@shared/components'
import { Authentication, SaveAccessToken } from '@domain/usecases'
import { FormContext } from '@shared/contexts'
import { Validation } from '@shared/protocols'
import Styles from '@shared/styles/login.scss'

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
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
    <div className={Styles.loginWrap}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <SubmitButton text="Entrar"/>
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default Login
