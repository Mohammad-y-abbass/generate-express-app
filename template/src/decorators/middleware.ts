import 'reflect-metadata';

export const ROUTE_MIDDLEWARE_METADATA_KEY = Symbol('routeMiddleware');

export function Middlewares(...middlewares: any[]): MethodDecorator {
  return (target, propertyKey) => {
    const existingMiddlewares =
      Reflect.getMetadata(ROUTE_MIDDLEWARE_METADATA_KEY, target, propertyKey) ||
      [];

    const allMiddlewares = [...existingMiddlewares, ...middlewares];

    Reflect.defineMetadata(
      ROUTE_MIDDLEWARE_METADATA_KEY,
      allMiddlewares,
      target.constructor
    );
  };
}
import 'reflect-metadata';
