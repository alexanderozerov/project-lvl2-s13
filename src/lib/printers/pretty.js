// @flow

import _ from 'lodash';

const parser = (obj, space = '') => {
  if (_.isObject(obj)) {
    return `{\n${space}    ${JSON.stringify(obj, null, 4).replace(/["{}\n]/g, '')}\n${space}    }`;
  }
  return obj;
};

const toStr = (ast: [], space: string = '') => {
  const pattern = {
    nested: (name, value) => `${space}    ${name}: ${toStr(value, '    ')}\n`,
    added: (name, value) => `${space}  + ${name}: ${parser(value, space)}\n`,
    deleted: (name, value) => `${space}  - ${name}: ${parser(value, space)}\n`,
    changed: (name, value, oldValue) => `${space}  + ${name}: ${parser(value, space)}\n` +
      `${space}  - ${name}: ${parser(oldValue, space)}\n`,
    unchanged: (name, value) => `${space}    ${name}: ${parser(value, space)}\n`,
  };

  const result = ast.map(elem => pattern[elem.type](elem.name, elem.value, elem.oldValue));

  return `{\n${result.join('')}${space}}`;
};

export default toStr;
