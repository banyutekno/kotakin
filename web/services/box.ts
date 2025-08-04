import { HttpError } from './error';

export const getBoxes = async () => {
  const resp = await fetch('/api/box');
  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

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

  const body = await resp.json();

  if (resp.status !== 201) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

interface ConfigureBoxParams {
  name?: string;
  env?: Record<string, string>;
}

export const configureBox = async (id: string, params: ConfigureBoxParams) => {
  const resp = await fetch(`/api/box/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });

  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

export const getBox = async (id: string, signal: AbortSignal) => {
  const resp = await fetch(`/api/box/${id}`, {
    signal,
  });
  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

export const startBox = async (id: string) => {
  const resp = await fetch(`/api/box/${id}/start`, {
    method: 'POST',
  });
  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

export const stopBox = async (id: string) => {
  const resp = await fetch(`/api/box/${id}/stop`, {
    method: 'POST',
  });

  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};

export const removeBox = async (id: string) => {
  const resp = await fetch(`/api/box/${id}`, {
    method: 'DELETE',
  });

  const body = await resp.json();

  if (resp.status !== 200) {
    throw new HttpError(body.message, resp.status);
  }

  return body;
};
