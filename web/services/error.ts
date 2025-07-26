export class HttpError extends Error {
  constructor(readonly status: number) {
    super(`error: ${status}`);
  }
}
