import { create } from './create';
import { list } from './list';
import { read } from './read';
import { remove } from './remove';
import { update } from './update';
import { dataWrapper } from './utils';

export const resources = async (libs, config) => {
  const libsWithWrappers = {
    ...libs,
    data: await dataWrapper(config.data, libs.data),
  };

  return [
    ...read(libsWithWrappers),
    ...list(libsWithWrappers),
    ...create(libsWithWrappers),
    ...remove(libsWithWrappers),
    ...update(libsWithWrappers),
  ];
};
