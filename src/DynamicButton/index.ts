import { warnInstall } from '../utils';
import Component from './src/index';

export const DynamicButton = warnInstall(Component);

export type { ButtonField } from './src/interface';
