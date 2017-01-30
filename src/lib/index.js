// @flow

import fs from 'fs';
import _ from 'lodash';
import parser from './parser';
import toStr from './print';

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { type: 'added', name: key, value: _.get(obj2, key) };
    } else if (!_.has(obj2, key)) {
      return { type: 'deleted', name: key, value: _.get(obj1, key) };
    } else if (_.isObject(_.get(obj1, key))) {
      return { type: 'nested', name: key, value: getDiff(_.get(obj1, key), _.get(obj2, key)) };
    } else if (_.get(obj1, key) !== _.get(obj2, key)) {
      return { type: 'changed', name: key, value: [_.get(obj2, key), _.get(obj1, key)] };
    }
    return { type: 'unchanged', name: key, value: _.get(obj1, key) };
  });
};

const getExt = path => path.split('.').pop();

const compare = (path1: string, path2: string) => {
  const obj1 = parser(fs.readFileSync(path1, 'utf8'), getExt(path1));
  const obj2 = parser(fs.readFileSync(path2, 'utf8'), getExt(path2));
  return toStr(getDiff(obj1, obj2));
};

export default compare;
