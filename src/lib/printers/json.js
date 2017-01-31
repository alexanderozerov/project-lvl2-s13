// @flow

import _ from 'lodash';

const parser = (ast: []) =>
  ast.reduce((acc, elem) => {
    if (_.isArray(elem.value)) {
      return { ...acc, [elem.name]: parser(elem.value) };
    }
    if (elem.type === 'changed') {
      return { ...acc,
        [elem.name]:
        { type: elem.type, value: elem.value, oldValue: elem.oldValue } };
    }
    return { ...acc, [elem.name]: { type: elem.type, value: elem.value } };
  }, {});


const toStr = (ast: []) => JSON.stringify(parser(ast), null, 4);

export default toStr;
