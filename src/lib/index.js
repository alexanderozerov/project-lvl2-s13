// @flow

import fs from 'fs';

const getDiff = (obj1, obj2) => {
  const before = Object.keys(obj1).reduce((str, key) => {
    let newStr = '';
    if (key in obj2 && obj2[key] === obj1[key]) {
      newStr = `${str}\n    ${key}: ${obj1[key]}`;
    } else if (key in obj2 && obj2[key] !== obj1[key]) {
      newStr = `${str}\n  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    } else {
      newStr = `${str}\n  - ${key}: ${obj1[key]}`;
    }
    return newStr;
  }, '{');
  const after = Object.keys(obj2).reduce((str, key) => {
    let newStr = '';
    if (obj1[key] === undefined) {
      newStr = `${str}  + ${key}: ${obj2[key]}`;
    }
    return newStr;
  }, '');
  return `${before}\n${after}\n}`;
};

const compare = (path1: string, path2: string) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  return getDiff(obj1, obj2);
};

export default compare;
