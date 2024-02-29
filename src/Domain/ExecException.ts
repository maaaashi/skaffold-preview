export class RenderException extends Error {
  constructor(public message: string) {
    super(message)
  }
}
