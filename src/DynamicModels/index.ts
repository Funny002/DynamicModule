import { warnInstall } from '../utils';
import Component from './src/index';

export const DynamicModels = warnInstall(Component);

export type { DynamicModelsField } from './src/interface';
