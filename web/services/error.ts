export class HttpError extends Error {
  constructor(
    readonly message: string,
    readonly status = 500,
  ) {
    super(message);
  }
}
