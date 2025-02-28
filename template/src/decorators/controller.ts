import 'reflect-metadata';

export const CONTROLLER_METADATA_KEY = Symbol('controller');

export default function Controller(path: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, path, target);
  };
}
