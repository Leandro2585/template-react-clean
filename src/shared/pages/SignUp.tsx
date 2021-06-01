import React from 'react'
import { Link } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader } from '@shared/components'
import { FormContext } from '@shared/contexts'
import Styles from '@shared/styles/signup.scss'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <FormContext.Provider value={{ state: {} }}>
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
            type="submit"
            className={Styles.submit}>
            Cadastrar
          </button>
          <Link to="/login" className={Styles.link}>Ir para login</Link>
          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  )
}

export default SignUp
