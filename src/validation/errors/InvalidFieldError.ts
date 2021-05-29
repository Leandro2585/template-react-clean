export class InvalidFieldError extends Error {
  constructor () {
    super('Valor do campo inválido')
  }
}
