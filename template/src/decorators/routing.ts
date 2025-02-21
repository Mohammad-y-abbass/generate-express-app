import 'reflect-metadata';
import { type HttpMethod, RouteDefinition } from './decorators.types';

export const ROUTE_METADATA_KEY = Symbol('routes');

function Route(method: HttpMethod, path: string): MethodDecorator {
  return (target, propertyKey) => {
    const routes: RouteDefinition[] =
      Reflect.getMetadata(ROUTE_METADATA_KEY, target.constructor) || [];

    routes.push({
      method,
      path,
      handlerName: propertyKey as string,
    });

    Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target.constructor);
  };
}

const Get = (path: string) => Route('GET', path);
const Post = (path: string) => Route('POST', path);
const Put = (path: string) => Route('PUT', path);
const Delete = (path: string) => Route('DELETE', path);

export { Get, Post, Put, Delete };
