// @flow

import pretty from './pretty';
import plain from './plain';
import json from './json';

const printers = { pretty, plain, json };

export default (ast: [], format: string) => printers[format](ast);
