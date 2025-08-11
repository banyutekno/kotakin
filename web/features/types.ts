export interface Box {
  id: string;
  name?: string;
  kind: string;
  template: string;
  state: string;
  env: Record<string, string>;
}
