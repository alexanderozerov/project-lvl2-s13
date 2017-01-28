// @flow

import fs from 'fs';
import _ from 'lodash';
import parser from './parser';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const str = keys.map((key) => {
    if (!(key in obj2)) {
      return `\n  - ${key}: ${obj1[key]}`;
    } else if (!(key in obj1)) {
      return `\n  + ${key}: ${obj2[key]}`;
    } else if (obj1[key] !== obj2[key]) {
      return `\n  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    }
    return `\n    ${key}: ${obj1[key]}`;
  });
  return `{${str.join('')}\n}`;
};

const getExt = path => path.split('.').pop();

const compare = (path1: string, path2: string) => {
  const obj1 = parser(fs.readFileSync(path1, 'utf8'), getExt(path1));
  const obj2 = parser(fs.readFileSync(path2, 'utf8'), getExt(path2));
  return getDiff(obj1, obj2);
};

export default compare;
