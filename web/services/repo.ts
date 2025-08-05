import { HttpError } from './error';

export const getRepos = async (signal?: AbortSignal) => {
  const resp = await fetch('/api/repo', {
    signal,
  });
  const body = await resp.json();
  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

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

export const updateRepo = async (id: string, signal?: AbortSignal) => {
  const resp = await fetch(`/api/repo/${id}/update`, {
    method: 'POST',
    signal,
  });
  const body = await resp.json();
  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

export const removeRepo = async (id: string, signal?: AbortSignal) => {
  const resp = await fetch(`/api/repo/${id}`, {
    method: 'DELETE',
    signal,
  });
  const body = await resp.json();
  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};
