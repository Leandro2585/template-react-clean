import React, { useState } from 'react'
import styles from './style.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@main/presentation/components'
import FormContext from '../../contexts/FormContext'
type StateProps = {
  isLoading: boolean;
  errorMessage: string;
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })
  return (
    <div className={styles.login}>
      <LoginHeader/>
      <FormContext.Provider value={state}>
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
