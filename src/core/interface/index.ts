export interface BaseField {
  field: string;
  prop?: string;
  show?: boolean;
  children?: BaseField[];
}
