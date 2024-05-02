import Component from './src/index';
import { warnInstall } from '../utils';

export const DynamicForm = warnInstall(Component);

export type { FormField, FormItemField } from './src/interface';
