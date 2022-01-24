import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler, Request, Response, NextFunction } from "express";


function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid Request")
      return;
    }
    console.log("Keys are")
    console.log(keys)
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`)
        return;
      }
    }
    next();
    return;

  }
}


export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance()
    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      const routeHnadler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method = Reflect.getMetadata(MetadataKeys.method, target.prototype, key) as Methods;
      const middlewares = Reflect.getMetadata(MetadataKeys.middelware, target.prototype, key) || [];

      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
      const validator = bodyValidators(requiredBodyProps);
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHnadler)
      }


    }
  }
}