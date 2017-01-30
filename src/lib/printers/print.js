// @flow

import pretty from './pretty';
import plain from './plain';

const printers = { pretty, plain };

export default (ast: [], format: string) => printers[format](ast);
