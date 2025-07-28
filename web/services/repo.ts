import { HttpError } from './error';

export const addRepo = async (url: string) => {
  const resp = await fetch('/api/box', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
  if (resp.status !== 201) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};
