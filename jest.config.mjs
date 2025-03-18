/** @type {import('ts-jest').JestConfigWithTsJest} */
import { readFileSync } from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';

const { compilerOptions } = JSON.parse(readFileSync(new URL('./tsconfig.json', import.meta.url), 'utf-8'));

export default {
  testTimeout: 100000,
  preset: 'ts-jest',
  testEnvironment: 'node',
  runner: 'groups',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /* , { prefix: '<rootDir>/' } */),
};
