import { HttpError } from './error';

export const getTemplates = async () => {
  const resp = await fetch('/api/template');
  if (resp.status !== 200) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};
