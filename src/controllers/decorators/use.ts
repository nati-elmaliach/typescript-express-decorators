import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";


export function use(middelware: Function) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middelwares = Reflect.getMetadata(MetadataKeys.middelware, target, key) || [];
    Reflect.defineMetadata(MetadataKeys.middelware, [...middelwares, middelware], target, key);
  }
}