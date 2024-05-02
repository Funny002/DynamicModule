import { warnInstall } from '../utils';
import Component from './src/index';

export const DynamicDropdown = warnInstall(Component);

export type { DropdownField } from './src/interface';
