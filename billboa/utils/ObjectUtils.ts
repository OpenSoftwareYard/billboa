export const valueForKey = (object: any, key: string) => {
  return key.split(".").reduce((o, i) => o[i], object);
};
