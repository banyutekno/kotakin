class HttpError extends Error {
  constructor(readonly status: number) {
    super(`error: ${status}`);
  }
}
export const getBoxes = async () => {
  const resp = await fetch('/api/box');
  if (resp.status !== 200) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};
