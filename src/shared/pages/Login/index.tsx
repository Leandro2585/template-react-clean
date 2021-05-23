import React, { useEffect, useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '../../components'
import FormContext from '../../contexts/FormContext'
import { Validation } from '../../protocols/validation'
import Styles from './style.scss'

type Props = {
  validation: Validation;
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)

    })
  }, [state.email, state.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
            className={Styles.submit}
          >Entrar</button>
          <span className={Styles.link}
          >Criar conta</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default Login
