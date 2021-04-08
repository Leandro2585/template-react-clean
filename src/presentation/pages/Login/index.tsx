import React, { useEffect, useState } from 'react'
import styles from './style.scss'
import { Footer, FormStatus, Input, LoginHeader } from 'presentation/components'
import FormContext from '../../contexts/FormContext'
import { Validation } from 'presentation/protocols/validation'

type Props = {
  validation: Validation;
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={styles.login}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button data-testid="submit" disabled type="submit" className={styles.submit}>Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default Login
