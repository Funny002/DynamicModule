export interface BaseField {
  id?: string;
  field: string;
  prop?: string;
  show?: boolean;
  children?: (BaseField | any)[];
  slots?: Record<string, (BaseField | any)[]>;
}
