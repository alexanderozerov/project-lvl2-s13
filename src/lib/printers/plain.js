// @flow

import _ from 'lodash';

const isComplex = (value) => {
  const result = _.isObject(value) ? 'complex value' : `value: ${value}`;
  return result;
};

const toStr = (ast: [], prefix: string = '') => {
  const pattern = {
    deleted: name => `Property '${prefix}${name}' was removed\n`,
    added: (name, value) => `Property '${prefix}${name}' was added with ${isComplex(value)}\n`,
    changed: (name, value, oldValue) => `Property '${prefix}${name}' was updated. From '${oldValue}' to '${value}'\n`,
    unchanged: () => '',
    nested: (name, value) => toStr(value, `${name}.`),
  };
  return ast.map(elem => pattern[elem.type](elem.name, elem.value, elem.oldValue)).join('');
};

export default toStr;
