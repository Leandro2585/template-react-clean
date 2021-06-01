import React, { useState } from 'react'
import { Footer, FormStatus, Input, LoginHeader } from '@shared/components'
import { FormContext } from '@shared/contexts'
import Styles from '@shared/styles/signup.scss'

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    confirmPasswordError: 'Campo obrigatório',
    mainError: ''
  })
  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <FormContext.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Sign Up</h2>
          <Input type="text" name="text" placeholder="Digite seu nome"/>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
          />
          <button
            disabled
            data-testid="submit"
            type="submit"
            className={Styles.submit}>
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
