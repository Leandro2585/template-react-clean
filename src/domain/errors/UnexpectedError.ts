export class UnexpectedError extends Error {
  constructor () {
    super('Something wrong happened. Try again soon.')
    this.name = 'UnexpectedError'
  }
}
