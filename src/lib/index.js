// @flow

import fs from 'fs';
import _ from 'lodash';
import parser from './parser';
import print from './printers/print';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { type: 'added', name: key, value: obj2[key] };
    } else if (!_.has(obj2, key)) {
      return { type: 'deleted', name: key, value: obj1[key] };
    } else if (_.isObject(obj1[key])) {
      return { type: 'nested', name: key, value: getDiff(obj1[key], obj2[key]) };
    } else if (obj1[key] !== obj2[key]) {
      return { type: 'changed', name: key, value: [obj2[key], obj1[key]] };
    }
    return { type: 'unchanged', name: key, value: obj1[key] };
  });
};

const getExt = path => path.split('.').pop();

const compare = (path1: string, path2: string, format: string = 'pretty') => {
  const obj1 = parser(fs.readFileSync(path1, 'utf8'), getExt(path1));
  const obj2 = parser(fs.readFileSync(path2, 'utf8'), getExt(path2));
  return print(getDiff(obj1, obj2), format);
};

export default compare;
