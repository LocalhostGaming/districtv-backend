function prismaSelects<K extends PropertyKey>(...keys: K[]) {
  return Object.fromEntries(keys.map((k) => [k, true])) as unknown as {
    [P in K]: boolean;
  };
}

export function prismaSelect<T>(...keys: (keyof T)[]) {
  return prismaSelects(...keys);
}
