import { HttpError } from './error';

export const getTemplates = async () => {
  const resp = await fetch('/api/template');

  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

export const getTemplate = async (id: string) => {
  const resp = await fetch(`/api/template/${id}`);

  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};
