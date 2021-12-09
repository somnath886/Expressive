import { MetadataKeys } from "../constants/metadata.keys";

function Controller(basePath: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
}

export default Controller;
