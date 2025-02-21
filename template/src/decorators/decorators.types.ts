import BaseController from '../app/Base.Controller';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RouteDefinition {
  path: string;
  method: HttpMethod;
  handlerName: string;
}

export type ControllerType = new () => BaseController;
