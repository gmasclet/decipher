export class ReferenceProvider {
  private current = 1;

  get(): string {
    return 'n' + this.current++;
  }
}
