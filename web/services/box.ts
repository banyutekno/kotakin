import { HttpError } from './error';

export const getBoxes = async () => {
  const resp = await fetch('/api/box');
  if (resp.status !== 200) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};

interface AddBoxParams {
  template: string;
  name?: string;
  env?: Record<string, string>;
}

export const addBox = async (params: AddBoxParams) => {
  const resp = await fetch('/api/box', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  if (resp.status !== 201) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};

export const startBox = async (id: string) => {
  const resp = await fetch(`/api/box/${id}/start`, {
    method: 'POST',
  });
  if (resp.status !== 200) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};

export const stopBox = async (id: string) => {
  const resp = await fetch(`/api/box/${id}/stop`, {
    method: 'POST',
  });
  if (resp.status !== 200) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};

export const removeBox = async (id: string) => {
  const resp = await fetch(`/api/box/${id}`, {
    method: 'DELETE',
  });
  if (resp.status !== 200) {
    throw new HttpError(resp.status);
  }

  const body = await resp.json();
  return body;
};
