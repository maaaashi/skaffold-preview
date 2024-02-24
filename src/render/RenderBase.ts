export abstract class RenderBase {
  abstract render(): void
  abstract exec(command: string): void
}