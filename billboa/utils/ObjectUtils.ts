export const valueForKey = (
  object: any,
  key: string,
  transform?: (value: any) => any,
) => {
  const value = key.split(".").reduce((o, i) => o[i], object);
  return transform ? transform(value) : value;
};
