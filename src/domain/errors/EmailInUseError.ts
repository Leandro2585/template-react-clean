export class EmailInUseError extends Error {
  constructor () {
    super('E-mail already in use')
    this.name = 'EmailInUseError'
  }
}
