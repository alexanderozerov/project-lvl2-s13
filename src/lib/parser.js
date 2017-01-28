// @flow

import yamlJs from 'yaml-js';
import iniJs from 'ini';

const parser = (file: string, ext: string) => {
  const format = {
    json: data => JSON.parse(data),
    yaml: data => yamlJs.load(data),
    yml: data => yamlJs.load(data),
    ini: data => iniJs.parse(data),
  };
  return format[ext](file);
};

export default parser;
