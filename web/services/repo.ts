import { HttpError } from './error';

export const addRepo = async (url: string) => {
  const resp = await fetch('/api/repo', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
  const body = await resp.json();
  if (resp.status !== 201) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};
