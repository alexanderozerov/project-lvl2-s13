// @flow

import _ from 'lodash';

const isComplex = value => _.isObject(value) ? 'complex value' : `value: ${value}`;

const toStr = (ast: [], prefix: string = '') => {
  const pattern = {
    deleted: name => `Property '${prefix}${name}' was removed\n`,
    added: (name, value) => `Property '${prefix}${name}' was added with ${isComplex(value)}\n`,
    changed: (name, value) => `Property '${prefix}${name}' was updated. From '${value[1]}' to '${value[0]}'\n`,
    unchanged: () => '',
    nested: (name, value) => toStr(value, `${name}.`),
  };
  return ast.map(elem => pattern[elem.type](elem.name, elem.value)).join('');
};

export default toStr;
