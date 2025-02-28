import { Request, Response, NextFunction, Application } from 'express';
import { ROUTE_METADATA_KEY } from '../decorators/routing';
import {
  RouteDefinition,
  type ControllerType,
} from '../decorators/decorators.types';
import { ROUTE_MIDDLEWARE_METADATA_KEY } from '../decorators/middleware';
import { CONTROLLER_METADATA_KEY } from '../decorators/controller';

export async function registerControllers(
  app: Application,
  controllers: ControllerType[]
) {
  controllers.forEach((ControllerClass) => {
    const controller = new ControllerClass();

    const routes =
      Reflect.getMetadata(ROUTE_METADATA_KEY, ControllerClass) || [];

    const middlewares =
      Reflect.getMetadata(ROUTE_MIDDLEWARE_METADATA_KEY, ControllerClass) || [];

    const routePath = Reflect.getMetadata(
      CONTROLLER_METADATA_KEY,
      ControllerClass
    );

    routes.forEach(({ method, path, handlerName }: RouteDefinition) => {
      app[method.toLowerCase() as keyof Application](
        `/api/${routePath}/${path}`,
        ...middlewares,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            await controller[handlerName](req, res, next);
          } catch (error) {
            next(error);
          }
        }
      );

      console.log(
        `✅ Registered: [${method}] ${routePath}/${path} -> ${handlerName} in ${ControllerClass.name}`
      );
    });
  });
}
