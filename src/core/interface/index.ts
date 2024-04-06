export interface BaseField {
  id?: string;
  field: string;
  prop?: string;
  show?: boolean;
  slotData?: Record<string, any>;
  children?: (BaseField | any)[];
  slots?: Record<string, (BaseField | any)[]>;
}
