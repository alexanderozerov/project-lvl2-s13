// @flow

import yamlJs from 'yaml-js';

const parser = (file: string, ext: string) => {
  const format = {
    json: data => JSON.parse(data),
    yaml: data => yamlJs.load(data),
    yml: data => yamlJs.load(data),
  };
  return format[ext](file);
};

export default parser;
