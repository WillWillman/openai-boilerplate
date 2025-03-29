import { create } from './create';
import { list } from './list';
import { read } from './read';
import { remove } from './remove';
import { update } from './update';

export const resources = (libs, _config) => [
  ...read(libs),
  ...list(libs),
  ...create(libs),
  ...remove(libs),
  ...update(libs),
];
